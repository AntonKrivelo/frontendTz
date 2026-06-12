import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosBase } from '../../api/axiosBase';
import { Box, Button, Divider, TextField, Typography, Alert } from '@mui/material';

interface Friend {
  id: number;
  username: string;
  tag: string;
}

interface FoundUser {
  id: number;
  username: string;
  tag: string;
}

interface AllUser {
  id: number;
  username: string;
  tag: string;
}

const FriendsPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [allUsers, setAllUsers] = useState<AllUser[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [foundUser, setFoundUser] = useState<FoundUser | null>(null);
  const [searchError, setSearchError] = useState('');
  const [addError, setAddError] = useState('');

  const fetchFriends = async () => {
    const res = await axiosBase.get(`/friends/${userId}`);
    setFriends(res.data);
  };

  useEffect(() => {
    axiosBase.get(`/friends/${userId}`).then((res) => setFriends(res.data));
    axiosBase.get('/users').then((res) => setAllUsers(res.data));
  }, [userId]);

  const searchByTag = async () => {
    setFoundUser(null);
    setSearchError('');
    const tag = tagInput.replace(/^@/, '').trim();
    if (!tag) return;
    try {
      const res = await axiosBase.get(`/users/tag/${tag}`);
      setFoundUser(res.data);
    } catch (err: any) {
      setSearchError(err.response?.data?.message ?? 'User not found');
    }
  };

  const addFriendByTag = async (tag: string) => {
    setAddError('');
    try {
      await axiosBase.post('/friends', { userId, friendTag: tag });
      setFoundUser(null);
      setTagInput('');
      fetchFriends();
    } catch (err: any) {
      setAddError(err.response?.data?.message ?? 'Error adding friend');
    }
  };

  const addFriend = async () => {
    if (!foundUser) return;
    addFriendByTag(foundUser.tag);
  };

  const friendIds = new Set(friends.map((f) => f.id));
  const suggestions = allUsers.filter(
    (u) => String(u.id) !== String(userId) && !friendIds.has(u.id),
  );

  const removeFriend = async (friendId: number) => {
    try {
      await axiosBase.delete(`/friends/${userId}/${friendId}`);
      fetchFriends();
    } catch (err: any) {
      setAddError(err.response?.data?.message ?? 'Error removing friend');
    }
  };

  return (
    <Box sx={{ maxWidth: 500, margin: '40px auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Friends
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
        <TextField
          label="Search by @tag"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchByTag()}
          size="small"
        />
        <Button variant="contained" onClick={searchByTag}>
          Search
        </Button>
      </Box>

      {searchError && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {searchError}
        </Alert>
      )}

      {foundUser && (
        <Box
          sx={{
            p: 1.5,
            border: '1px solid #ddd',
            borderRadius: 1,
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography>
            {foundUser.username}{' '}
            <Typography component="span" color="text.secondary">
              @{foundUser.tag}
            </Typography>
          </Typography>
          <Button variant="outlined" size="small" onClick={addFriend}>
            Add friend
          </Button>
        </Box>
      )}

      {addError && (
        <Alert severity="error" sx={{ mb: 1 }}>
          {addError}
        </Alert>
      )}

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        My friends
      </Typography>

      {friends.length === 0 ? (
        <Typography color="text.secondary">No friends yet</Typography>
      ) : (
        friends.map((f) => (
          <Box
            key={f.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              py: 1,
              borderBottom: '1px solid #eee',
            }}
          >
            <Typography>
              {f.username}{' '}
              <Typography component="span" color="text.secondary">
                @{f.tag}
              </Typography>
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                onClick={() => navigate(`/deeds?userId=${f.id}`)}
              >
                View deeds
              </Button>
              <Button size="small" color="error" onClick={() => removeFriend(f.id)}>
                Remove
              </Button>
            </Box>
          </Box>
        ))
      )}

      {suggestions.length > 0 && (
        <>
          <Divider sx={{ my: 2 }} />
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            People you may know
          </Typography>
          {suggestions.map((u) => (
            <Box
              key={u.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                py: 1,
                borderBottom: '1px solid #eee',
              }}
            >
              <Typography>
                {u.username}{' '}
                <Typography component="span" color="text.secondary">
                  @{u.tag}
                </Typography>
              </Typography>
              <Button size="small" variant="outlined" onClick={() => addFriendByTag(u.tag)}>
                Add
              </Button>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
};

export default FriendsPage;
