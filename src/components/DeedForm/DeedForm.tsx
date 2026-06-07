import { useState } from 'react';
import { Button, TextField } from '@mui/material';

const DeedForm = ({ onCreate }: any) => {
  const [value, setValue] = useState('');

  const submit = async (e: any) => {
    e.preventDefault();
    if (!value) return;

    await onCreate(value);
    setValue('');
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 10 }}>
      <TextField
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        label="Новое дело"
      />

      <Button type="submit" variant="contained">
        Add
      </Button>
    </form>
  );
};

export default DeedForm;
