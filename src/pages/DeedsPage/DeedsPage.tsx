import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();

  const viewUserId = searchParams.get('userId');
  const myUserId = localStorage.getItem('userId');
  const userId = viewUserId ?? myUserId;
  const isReadOnly = viewUserId !== null && viewUserId !== myUserId;

  const fetchDeeds = async () => {
    const res = await axiosBase.get(`/deeds/${userId}`);
    setDeeds(res.data);
  };

  useEffect(() => {
    fetchDeeds();
  }, [userId]);

  const createDeed = async (title: string) => {
    await axiosBase.post('/deeds', { userId, title });
    fetchDeeds();
  };

  const toggle = async (deed: Deed) => {
    await axiosBase.put(`/deeds/${deed.id}`, { done: !deed.done });
    fetchDeeds();
  };

  const remove = async (id: number) => {
    await axiosBase.delete(`/deeds/${id}`);
    fetchDeeds();
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <h2>{isReadOnly ? "Friend's good deeds" : 'My good deeds'}</h2>

      {!isReadOnly && <DeedForm onCreate={createDeed} />}

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
          <Checkbox
            checked={d.done}
            onChange={() => !isReadOnly && toggle(d)}
            disabled={isReadOnly}
          />
          <span style={{ flex: 1, textDecoration: d.done ? 'line-through' : 'none' }}>
            {d.title}
          </span>
          {!isReadOnly && (
            <Button color="error" onClick={() => remove(d.id)}>
              delete
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default DeedsPage;
