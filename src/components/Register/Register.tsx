import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthFormWrapper from '../../utils/AuthFormWrapper';
import styles from './Register.module.css';
import { Button, TextField, Typography } from '@mui/material';
import { axiosBase } from '../../api/axiosBase';

interface RegisterFormData {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    try {
      const res = await axiosBase.post('/register', data);

      console.log('RESPONSE:', res.data);

      if (res.data.success) {
        setSuccess(true);
        reset();

        setTimeout(() => {
          setSuccess(false);

          // 🔥 переход на страницу пользователей
          navigate('/users');
        }, 500);
      }
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  return (
    <AuthFormWrapper header="Register">
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          label="Username"
          {...register('username', {
            required: 'Username is required.',
            minLength: { value: 2, message: 'Min 2 characters' },
          })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />

        <TextField
          label="Email"
          {...register('email', {
            required: 'Email is required.',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email format',
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          label="Password"
          type="password"
          {...register('password', {
            required: 'Password is required.',
            minLength: { value: 8, message: 'Min 8 characters' },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Register
        </Button>

        {success && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            Register success 🎉
          </Typography>
        )}
      </form>
    </AuthFormWrapper>
  );
};

export default Register;
