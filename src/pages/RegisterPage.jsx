import React, { useState } from 'react';
import { api } from '../api/api';
import { useNavigate, Link } from 'react-router-dom';
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
    } catch {
      alert(t('registration_error'));
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleRegister} style={formStyle}>
        <h2>{t('register')}</h2>

        <input
          type="text"
          name="name"
          placeholder={t('name')}
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="styled-input"
        />
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

        <button type="submit">{t('register_button')}</button>

        <div style={linkWrapper}>
          <Link to="/login" style={linkStyle}>
            {t('already_have_account')}
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

export default RegisterPage;
