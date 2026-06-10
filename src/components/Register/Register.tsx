import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosBase } from '../../api/axiosBase';
import { Button, TextField, Typography } from '@mui/material';

interface Form {
  username: string;
  email: string;
  password: string;
}

const Register = () => {
  const { register, handleSubmit, reset } = useForm<Form>();
  const [userTag, setUserTag] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    const res = await axiosBase.post('/register', data);
    if (res.data.success) {
      localStorage.setItem('userId', String(res.data.user.id));
      localStorage.setItem('username', res.data.user.username);
      localStorage.setItem('userTag', res.data.user.tag ?? '');
      localStorage.setItem('userEmail', res.data.user.email);
      setUserTag(res.data.user.tag);
      reset();
      setTimeout(() => navigate('/deeds'), 1500);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Username" {...register('username')} fullWidth />
      <TextField label="Email" {...register('email')} fullWidth />
      <TextField label="Password" type="password" {...register('password')} fullWidth />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Register
      </Button>
      {userTag && (
        <Typography color="green" sx={{ mt: 1 }}>
          Registered! Your tag: @{userTag}
        </Typography>
      )}
    </form>
  );
};

export default Register;
