import { Grid } from '@mui/material';
import { useState } from 'react';
import Login from '../../components/Login/Login';
import Register from '../../components/Register/Register';

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <Grid
      container
      sx={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {isRegister ? <Login /> : <Register />}
    </Grid>
  );
};

export default AuthPage;
