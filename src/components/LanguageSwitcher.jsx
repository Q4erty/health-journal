import React from 'react';
import { useLang } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { lang, switchLang } = useLang();

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

  return (
    <select
      value={lang}
      onChange={(e) => switchLang(e.target.value)}
      style={selectStyle}
    >
      <option value="ru">Русский Ru</option>
      <option value="en">English Eng</option>
    </select>
  );
};

export default LanguageSwitcher;
