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
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    const res = await axiosBase.post('/register', data);

    if (res.data.success) {
      setSuccess(true);
      reset();

      setTimeout(() => {
        setSuccess(false);
        navigate('/deeds');
      }, 500);
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

      {success && <Typography color="green">Success</Typography>}
    </form>
  );
};

export default Register;
