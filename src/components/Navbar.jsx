import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar = () => {
  const { user, dispatch } = useAuth();
  const { t } = useLang();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={linkStyle}>{t('home')}</Link>
        <Link to="/entries" style={linkStyle}>{t('journal')}</Link>
        <Link to="/profile" style={linkStyle}>{t('profile')}</Link>
        {user?.role === 'admin' && (
          <Link to="/admin" style={linkStyle}>{t('admin')}</Link>
        )}
      </div>

      <div style={rightControls}>
        <span>{user?.user?.name}</span>

        <button onClick={toggleTheme}>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <LanguageSwitcher />

        <button onClick={handleLogout}>{t('logout')}</button>
      </div>
    </nav>
  );
};

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1rem',
  borderBottom: '1px solid #ccc',
  marginBottom: '2rem',
};

const linkStyle = {
  marginRight: '1rem',
  textDecoration: 'none',
  color: 'inherit',
};

const rightControls = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
};

export default Navbar;
