import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import AuthFormWrapper from '../../utils/AuthFormWrapper';
import styles from './Login.module.css';
import { Button, TextField, Typography } from '@mui/material';

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [success, setSuccess] = useState(false);

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    console.log('LOGIN DATA:', data);

    setSuccess(true);
    reset();

    setTimeout(() => setSuccess(false), 2000);
  };

  return (
    <AuthFormWrapper header="Login">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Email"
          {...register('email', { required: 'Email is required.' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          {...register('password', { required: 'Password is required.' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Login
        </Button>

        {success && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            Login success (static)
          </Typography>
        )}
      </form>
    </AuthFormWrapper>
  );
};

export default Login;
