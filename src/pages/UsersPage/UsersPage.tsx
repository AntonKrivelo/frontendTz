import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  id: number;
  username: string;
  email: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then((r) => r.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <h2>Users</h2>

      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => navigate(`/deeds/${user.id}`)}
          style={{ cursor: 'pointer' }}
        >
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
