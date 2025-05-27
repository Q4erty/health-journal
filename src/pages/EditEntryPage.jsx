import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const EditEntryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLang();

  const [form, setForm] = useState({
    date: '',
    mood: '',
    pulse: '',
    comment: '',
  });

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`/entries/${id}`);
      setForm(res.data);
    };
    fetch();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.put(`/entries/${id}`, form);
    alert(t('entryUpdated'));
    navigate('/entries');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{t('editEntry')}</h2>
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

export default EditEntryPage;
