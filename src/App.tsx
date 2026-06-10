import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import UsersPage from './pages/UsersPage/UsersPage';
import DeedsPage from './pages/DeedsPage/DeedsPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import FriendsPage from './pages/FriendsPage/FriendsPage';
import Header from './components/Header/Header';

const WithHeader = ({ children }: { children: React.ReactNode }) => (
  <>
    <Header />
    {children}
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/deeds" element={<WithHeader><DeedsPage /></WithHeader>} />
        <Route path="/users" element={<WithHeader><UsersPage /></WithHeader>} />
        <Route path="/profile" element={<WithHeader><ProfilePage /></WithHeader>} />
        <Route path="/friends" element={<WithHeader><FriendsPage /></WithHeader>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
