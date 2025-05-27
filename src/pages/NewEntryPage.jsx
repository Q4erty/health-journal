import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const NewEntryPage = () => {
  const { user } = useAuth();
  const { t } = useLang();
  const [form, setForm] = useState({
    date: '',
    mood: '',
    pulse: '',
    comment: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/entries', {
        ...form,
        userId: user.user.id,
      });
      alert(t('entry_added'));
      navigate('/entries');
    } catch {
      alert(t('error_adding_entry'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{t('new_entry')}</h2>
      <input
        name="date"
        type="date"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        name="mood"
        placeholder={t('mood')}
        value={form.mood}
        onChange={handleChange}
        required
      />
      <input
        name="pulse"
        placeholder={t('pulse')}
        value={form.pulse}
        onChange={handleChange}
        required
      />
      <textarea
        name="comment"
        placeholder={t('comment')}
        value={form.comment}
        onChange={handleChange}
      />
      <button type="submit">{t('save')}</button>
    </form>
  );
};

export default NewEntryPage;
