import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

const EditEntryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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
    alert('Запись обновлена');
    navigate('/entries');
  };

  return (
    <div className="container" style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Редактировать запись</h2>

        <input
          type="date"
          name="date"
          className="styled-input"
          value={form.date}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="mood"
          className="styled-input"
          placeholder="Настроение"
          value={form.mood}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="pulse"
          className="styled-input"
          placeholder="Пульс"
          value={form.pulse}
          onChange={handleChange}
          required
        />

        <textarea
          name="comment"
          className="styled-input"
          placeholder="Комментарий"
          value={form.comment}
          onChange={handleChange}
          rows={4}
        />

        <button type="submit" className="btn btn-primary">Сохранить</button>
      </form>
    </div>
  );
};

const containerStyle = {
  maxWidth: '600px',
  margin: '0 auto',
  padding: '2rem',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
};

export default EditEntryPage;
