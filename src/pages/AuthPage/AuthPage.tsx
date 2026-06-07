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
        height: '100vh',
      }}
    >
      {isRegister ? <Register /> : <Login />}

      <Button onClick={() => setIsRegister((p) => !p)}>
        {isRegister ? 'Go Login' : 'Go Register'}
      </Button>

      <Button variant="outlined" onClick={() => navigate('/deeds')}>
        Go to Deeds
      </Button>
    </Grid>
  );
};

export default AuthPage;
