import React from 'react';
import { useLang } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { lang, switchLang } = useLang();

  return (
    <select value={lang} onChange={(e) => switchLang(e.target.value)}>
      <option value="ru">Русский 🇷🇺</option>
      <option value="en">English 🇬🇧</option>
    </select>
  );
};

export default LanguageSwitcher;
