// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const check = await api.get(`/users?email=${email}`);
      if (check.data.length > 0) {
        return alert('Пользователь уже существует');
      }
      await api.post('/users', {
        name,
        email,
        password,
        role: 'user',
      });
      alert('Успешная регистрация');
      navigate('/login');
    } catch (err) {
      alert('Ошибка регистрации');
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Регистрация</h2>
      <input type="text" placeholder="Имя" value={name}
             onChange={(e) => setName(e.target.value)} required />
      <input type="email" placeholder="Email" value={email}
             onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Пароль" value={password}
             onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
};

export default RegisterPage;
