import React, { createContext, useContext, useState } from 'react';
import en from '../translations/en.json';
import ru from '../translations/ru.json';

const LanguageContext = createContext();

const translations = {
  en,
  ru,
};

export const LanguageProvider = ({ children }) => {
  const stored = localStorage.getItem('lang');
  const [lang, setLang] = useState(stored || 'ru');

  const t = (key) => translations[lang][key] || key;

  const switchLang = (newLang) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
