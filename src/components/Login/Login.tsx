import { useForm } from 'react-hook-form';
import { axiosBase } from '../../api/axiosBase';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface Form {
  email: string;
  password: string;
}

const Login = () => {
  const { register, handleSubmit } = useForm<Form>();
  const navigate = useNavigate();

  const onSubmit = async (data: Form) => {
    try {
      const res = await axiosBase.post('/login', data);
      if (res.data.success) {
        localStorage.setItem('userId', String(res.data.user.id));
        localStorage.setItem('username', res.data.user.username);
        localStorage.setItem('userTag', res.data.user.tag ?? '');
        localStorage.setItem('userEmail', res.data.user.email);
        navigate('/deeds');
      }
    } catch (err: any) {
      console.log(err.response?.data || err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Email" {...register('email')} fullWidth />
      <TextField label="Password" type="password" {...register('password')} fullWidth />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        Login
      </Button>
    </form>
  );
};

export default Login;
