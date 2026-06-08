import { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface DeedFormProps {
  onCreate: (value: string) => Promise<void> | void;
}

const DeedForm = ({ onCreate }: DeedFormProps) => {
  const [value, setValue] = useState('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value.trim()) return;

    await onCreate(value);
    setValue('');
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 10 }}>
      <TextField
        fullWidth
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        label="Новое дело"
      />

      <Button type="submit" variant="contained">
        Add
      </Button>
    </form>
  );
};

export default DeedForm;
