import { useEffect, useState } from 'react';
import { axiosBase } from '../../api/axiosBase';
import DeedForm from '../../components/DeedForm/DeedForm';
import { Checkbox, Button } from '@mui/material';

interface Deed {
  id: number;
  title: string;
  done: boolean;
}

const DeedsPage = () => {
  const [deeds, setDeeds] = useState<Deed[]>([]);

  const userId = localStorage.getItem('userId');

  const fetchDeeds = async () => {
    const res = await axiosBase.get(`/deeds/${userId}`);
    setDeeds(res.data);
  };

  useEffect(() => {
    fetchDeeds();
  }, []);

  const createDeed = async (title: string) => {
    await axiosBase.post('/deeds', {
      userId,
      title,
    });

    fetchDeeds();
  };

  const toggle = async (deed: Deed) => {
    await axiosBase.put(`/deeds/${deed.id}`, {
      done: !deed.done,
    });

    fetchDeeds();
  };

  const remove = async (id: number) => {
    await axiosBase.delete(`/deeds/${id}`);
    fetchDeeds();
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <h2>Мои добрые дела</h2>

      <DeedForm onCreate={createDeed} />

      {deeds.map((d) => (
        <div
          key={d.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: 10,
            borderBottom: '1px solid #ddd',
          }}
        >
          <Checkbox checked={d.done} onChange={() => toggle(d)} />

          <span style={{ flex: 1 }}>{d.title}</span>

          <Button color="error" onClick={() => remove(d.id)}>
            delete
          </Button>
        </div>
      ))}
    </div>
  );
};

export default DeedsPage;
