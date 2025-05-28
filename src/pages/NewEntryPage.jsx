import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const NewEntryPage = () => {
  const { user } = useAuth();
  const { t } = useLang();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    date: '',
    mood: '',
    pulse: '',
    comment: '',
  });

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
    <div className="container" style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h2 className="text-center mb-4">{t('new_entry')}</h2>
      <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
  <input
    name="date"
    type="date"
    value={form.date}
    onChange={handleChange}
    required
    className="input-field"
  />
  <input
    name="mood"
    type="text"
    placeholder={t('mood')}
    value={form.mood}
    onChange={handleChange}
    required
    className="input-field"
  />
  <input
    name="pulse"
    type="text"
    placeholder={t('pulse')}
    value={form.pulse}
    onChange={handleChange}
    required
    className="input-field"
  />
  <textarea
    name="comment"
    placeholder={t('comment')}
    value={form.comment}
    onChange={handleChange}
    rows="4"
    className="input-field"
    style={{ resize: 'none' }}
  />
  <button type="submit" className="mt-3">
    {t('save')}
  </button>
</form>

    </div>
  );
};

export default NewEntryPage;
