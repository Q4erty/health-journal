import React, { useState } from 'react';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { t } = useLang();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const check = await api.get(`/users?email=${email}`);
      if (check.data.length > 0) {
        return alert(t('user_exists'));
      }
      await api.post('/users', {
        name,
        email,
        password,
        role: 'user',
      });
      alert(t('registration_success'));
      navigate('/login');
    } catch (err) {
      alert(t('registration_error'));
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>{t('register')}</h2>
      <input
        type="text"
        placeholder={t('name')}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder={t('email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder={t('password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">{t('register_button')}</button>
    </form>
  );
};

export default RegisterPage;
