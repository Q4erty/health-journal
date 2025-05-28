import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLang } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import LanguageSwitcher from './LanguageSwitcher';


const Navbar = () => {
  const { user, dispatch } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { lang, switchLang, t } = useLang();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/" className="nav-link">{t('home')}</Link>
        <Link to="/entries" className="nav-link">{t('journal')}</Link>
        <Link to="/profile" className="nav-link">{t('profile')}</Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="nav-link">{t('admin')}</Link>
        )}
      </div>

      <div className="nav-controls">
        <span className="user-name">{user?.user?.name}</span>

        <button 
          onClick={toggleTheme}
          className="theme-toggle"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <select
          value={lang}
          onChange={(e) => switchLang(e.target.value)}
          className="lang-select"
        >
          <option value="ru">Русский</option>
          <option value="en">English</option>
        </select>

        <button 
          onClick={handleLogout}
          className="logout-btn"
        >
          {t('logout')}
        </button>
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

const selectStyle = {
  height: '38px',
  padding: '8px 16px',
  borderRadius: '8px',
  fontSize: '15px',
  fontWeight: '600',
  backgroundColor: 'var(--btn-primary-bg)',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
  boxShadow: '0 6px 15px rgba(59, 130, 246, 0.5)',
  transition: 'background-color 0.3s ease, box-shadow 0.3s ease, transform 0.15s ease',
};

export default Navbar;
