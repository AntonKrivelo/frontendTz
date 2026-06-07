import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import UsersPage from './pages/UsersPage/UsersPage';
import DeedsPage from './pages/DeedsPage/DeedsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/deeds" element={<DeedsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
