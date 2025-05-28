import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { dispatch } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.get(`/users?email=${email}&password=${password}`);
      if (res.data.length > 0) {
        const user = res.data[0];
        dispatch({
          type: 'LOGIN',
          payload: { user, token: 'fake-token', role: user.role },
        });
        navigate('/');
      } else {
        alert(t('invalid_credentials'));
      }
    } catch {
      alert(t('login_error'));
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleLogin} style={formStyle}>
        <h2>{t('login')}</h2>

        <input
          type="email"
          name="email"
          placeholder={t('email')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="styled-input"
        />

        <input
          type="password"
          name="password"
          placeholder={t('password')}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="styled-input"
        />

        <button type="submit">{t('login_button')}</button>

        <div style={linkWrapper}>
          <Link to="/register" style={linkStyle}>
            {t('register')}
          </Link>
        </div>
      </form>
    </div>
  );
};

const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '80vh',
};

const formStyle = {
  backgroundColor: 'var(--container-bg)',
  color: 'var(--container-text)',
  padding: '2rem',
  borderRadius: '12px',
  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  width: '100%',
  maxWidth: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};

const linkWrapper = {
  marginTop: '1rem',
  textAlign: 'center',
};

const linkStyle = {
  textDecoration: 'underline',
  fontSize: '14px',
  color: 'var(--link-color)',
};

export default LoginPage;
