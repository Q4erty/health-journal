import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import AdminRoute from './components/AdminRoute';
import ProfilePage from './pages/ProfilePage';

const Home = () => <h1>Добро пожаловать!</h1>;

const AdminPanel = () => <h2>Панель администратора</h2>;

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Home />} />
        <Route path="/update-password" element={<UpdatePasswordPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminPanel />} />
      </Route>
    </Routes>
  );
}

export default App;
