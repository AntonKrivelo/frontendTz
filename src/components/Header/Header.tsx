import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') ?? '';
  const tag = localStorage.getItem('userTag') ?? '';

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userTag');
    localStorage.removeItem('userEmail');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ cursor: 'pointer', mr: 2 }}
          onClick={() => navigate('/deeds')}
        >
          Good Deeds
        </Typography>

        <Box sx={{ flexGrow: 1, display: 'flex', gap: 1 }}>
          <Button color="inherit" onClick={() => navigate('/deeds')}>
            My Deeds
          </Button>
          <Button color="inherit" onClick={() => navigate('/friends')}>
            Friends
          </Button>
        </Box>

        <Button color="inherit" onClick={() => navigate('/profile')}>
          {username}
          {tag && (
            <Typography component="span" sx={{ ml: 0.5, opacity: 0.7, fontSize: '0.8em' }}>
              @{tag}
            </Typography>
          )}
        </Button>

        <Button color="inherit" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
