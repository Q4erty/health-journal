import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const HomePage = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();
  const { t } = useLang();

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const res = await api.get(`/entries?userId=${user.user.id}`);
        setEntries(res.data);
      } catch (err) {
        console.error(t('error_loading_entries'), err);
      }
    };
    fetchEntries();
  }, [user.user.id, t]);

  const recentEntries = entries.slice(-3).reverse();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h2>{t('greeting')}, {user.user.name} 👋</h2>
      <p>{t('role')}: {user.role}</p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <div style={cardStyle}>
          <h4>{t('total_entries')}</h4>
          <p>{entries.length}</p>
        </div>
        <div style={cardStyle}>
          <h4>{t('last_mood')}</h4>
          <p>{entries.length > 0 ? entries[entries.length - 1].mood : t('empty')}</p>
        </div>
        <div style={cardStyle}>
          <h4>{t('avg_pulse')}</h4>
          <p>
            {
              entries.length > 0
                ? Math.round(entries.reduce((acc, cur) => acc + Number(cur.pulse || 0), 0) / entries.length)
                : t('empty')
            }
          </p>
        </div>
      </div>

      <h3 style={{ marginTop: '2rem' }}>{t('recent_entries')}</h3>
      {recentEntries.length === 0 ? (
        <p>{t('no_entries')}</p>
      ) : (
        <ul>
          {recentEntries.map((entry) => (
            <li key={entry.id}>
              <strong>{entry.date}</strong> — {entry.mood}, {t('pulse')}: {entry.pulse}
            </li>
          ))}
        </ul>
      )}

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button onClick={() => navigate('/entries/new')}>➕ {t('add_entry')}</button>
        <button onClick={() => navigate('/entries')}>📋 {t('journal')}</button>
        <button onClick={() => navigate('/profile')}>👤 {t('profile')}</button>
      </div>
    </div>
  );
};

const cardStyle = {
  background: '#f1f1f1',
  padding: '1rem',
  borderRadius: '8px',
  flex: '1 1 30%',
  textAlign: 'center',
  minWidth: '150px',
};

export default HomePage;
