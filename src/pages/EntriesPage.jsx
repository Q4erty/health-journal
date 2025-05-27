import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';

const ITEMS_PER_PAGE = 5;

const EntriesPage = () => {
  const { user } = useAuth();
  const { t } = useLang();
  const [entries, setEntries] = useState([]);
  const [search, setSearch] = useState('');
  const [moodFilter, setMoodFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      const res = await api.get(`/entries?userId=${user.user.id}`);
      setEntries(res.data);
    };
    fetch();
  }, [user.user.id]);

  const filtered = entries
    .filter((e) =>
      (e.comment?.toLowerCase().includes(search.toLowerCase()) ||
       e.mood?.toLowerCase().includes(search.toLowerCase()))
    )
    .filter((e) => (moodFilter ? e.mood === moodFilter : true))
    .filter((e) => (dateFilter ? e.date === dateFilter : true))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const paginated = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);

  const handleDelete = async (id) => {
    if (window.confirm(t('confirm_delete'))) {
      await api.delete(`/entries/${id}`);
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const uniqueMoods = [...new Set(entries.map((e) => e.mood))];

  return (
    <div>
      <h2>{t('my_entries')}</h2>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          placeholder={t('search_placeholder')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={moodFilter} onChange={(e) => setMoodFilter(e.target.value)}>
          <option value="">{t('filter_by_mood')}</option>
          {uniqueMoods.map((mood) => (
            <option key={mood} value={mood}>
              {mood}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />

        <button onClick={() => { setSearch(''); setMoodFilter(''); setDateFilter(''); }}>
          {t('reset')}
        </button>
      </div>

      <ul>
        {paginated.map((entry) => (
          <li key={entry.id}>
            <strong>{entry.date}</strong> — {entry.mood}, {t('pulse')}: {entry.pulse}
            <br />
            <Link to={`/entries/${entry.id}`}>{t('view_details')}</Link> |{' '}
            <Link to={`/entries/${entry.id}/edit`}>{t('edit')}</Link> |{' '}
            <button onClick={() => handleDelete(entry.id)}>{t('delete')}</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '1rem' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} disabled={i + 1 === page}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EntriesPage;
