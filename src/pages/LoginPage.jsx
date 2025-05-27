import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const { t } = useLang();

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
        alert(t('invalid_credentials'));
      }
    } catch (err) {
      alert(t('login_error'));
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>{t('login')}</h2>
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
      <button type="submit">{t('login_button')}</button>
    </form>
  );
};

export default LoginPage;
