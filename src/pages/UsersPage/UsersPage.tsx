import { useEffect, useState, useCallback } from 'react';

interface User {
  id: number;
  username: string;
  email: string;
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:5000/users');

      if (!response.ok) {
        throw new Error('Ошибка запроса');
      }

      const data: User[] = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div style={{ padding: 20 }}>
      <h2>Users</h2>

      {users.map((user) => (
        <div key={user.id}>
          {user.username} — {user.email}
        </div>
      ))}
    </div>
  );
};

export default UsersPage;
