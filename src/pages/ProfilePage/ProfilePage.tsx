import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosBase } from '../../api/axiosBase';
import { Button, TextField, Typography, Box, Divider, Alert } from '@mui/material';

interface Form {
  username: string;
  email: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const tag = localStorage.getItem('userTag');
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { isSubmitting } } = useForm<Form>({
    defaultValues: {
      username: localStorage.getItem('username') ?? '',
      email: localStorage.getItem('userEmail') ?? '',
    },
  });

  const onSubmit = async (data: Form) => {
    setSuccessMsg('');
    setErrorMsg('');
    try {
      const res = await axiosBase.put(`/users/${userId}`, data);
      if (res.data.success) {
        localStorage.setItem('username', res.data.user.username);
        localStorage.setItem('userEmail', res.data.user.email);
        setSuccessMsg('Profile updated');
      }
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message ?? 'Error updating profile');
    }
  };

  const deleteAccount = async () => {
    if (!window.confirm('Delete your account? This cannot be undone.')) return;
    try {
      await axiosBase.delete(`/users/${userId}`);
      localStorage.clear();
      navigate('/');
    } catch (err: any) {
      setErrorMsg(err.response?.data?.message ?? 'Error deleting account');
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: '40px auto', p: 2 }}>
      <Typography variant="h5" gutterBottom>
        Profile
      </Typography>
      {tag && (
        <Typography color="text.secondary" gutterBottom>
          @{tag}
        </Typography>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField label="Username" {...register('username')} fullWidth sx={{ mb: 2 }} />
        <TextField label="Email" {...register('email')} fullWidth sx={{ mb: 2 }} />
        {successMsg && <Alert severity="success" sx={{ mb: 1 }}>{successMsg}</Alert>}
        {errorMsg && <Alert severity="error" sx={{ mb: 1 }}>{errorMsg}</Alert>}
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Save changes
        </Button>
      </form>

      <Divider sx={{ my: 4 }} />

      <Button color="error" variant="outlined" onClick={deleteAccount}>
        Delete account
      </Button>
    </Box>
  );
};

export default ProfilePage;
