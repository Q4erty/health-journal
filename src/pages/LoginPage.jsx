import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        const user = res.data[0];
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
            token: 'fake-token',
            role: user.role,
          },
        });
        navigate('/');
      } else {
        alert('Неверный email или пароль');
      }
    } catch (err) {
      alert('Ошибка входа');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Вход</h2>
      <input type="email" placeholder="Email" value={email}
             onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Пароль" value={password}
             onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Войти</button>
    </form>
  );
};

export default LoginPage;
