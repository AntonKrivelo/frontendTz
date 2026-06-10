import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosBase } from '../../api/axiosBase';

interface User {
  id: number;
  username: string;
  email: string;
  tag: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosBase.get('/users').then((res) => setUsers(res.data));
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <h2>Users</h2>

      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => navigate(`/deeds?userId=${user.id}`)}
          style={{
            cursor: 'pointer',
            padding: '10px 0',
            borderBottom: '1px solid #eee',
            display: 'flex',
            gap: 8,
          }}
        >
          <span>{user.username}</span>
          {user.tag && <span style={{ color: '#888' }}>@{user.tag}</span>}
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
