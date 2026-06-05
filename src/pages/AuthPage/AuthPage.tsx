import { Grid, Button } from '@mui/material';
import { useState } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(true);
  const navigate = useNavigate();

  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      {isRegister ? <Register /> : <Login />}

      <Button variant="text" onClick={() => setIsRegister((prev) => !prev)}>
        {isRegister ? 'Already have account? Login' : 'No account? Register'}
      </Button>

      <Button variant="contained" onClick={() => navigate('/users')} sx={{ mt: 2 }}>
        Go to Users
      </Button>
    </Grid>
  );
};

export default AuthPage;
