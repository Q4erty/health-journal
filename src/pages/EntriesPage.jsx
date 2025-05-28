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
  
  const buttonBaseStyle = {
    minWidth: '110px',
    height: '36px',
    fontSize: '14px',
    fontWeight: '500',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
  

  
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
    <div className="container">
      <h2 className="mb-4">{t('my_entries')}</h2>

      <div className="row g-3 mb-4 justify-content-center">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control input-field"
            placeholder={t('search_placeholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select input-field"
            value={moodFilter}
            onChange={(e) => setMoodFilter(e.target.value)}
          >
            <option value="">{t('filter_by_mood')}</option>
            {uniqueMoods.map((mood) => (
              <option key={mood} value={mood}>
                {mood}
              </option>
            ))}
          </select>
        </div>

        <input
          type="date"
          className="form-control custom-date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        />


        <div className="col-12 text-center">
          <button className="btn btn-primary" onClick={() => {
            setSearch('');
            setMoodFilter('');
            setDateFilter('');
          }}>
            {t('reset')}
          </button>
        </div>
      </div>

      <ul className="list-group mb-4">
        {paginated.map((entry) => (
          <li key={entry.id} className="list-group-item d-flex justify-content-between align-items-start" style={{ backgroundColor: 'var(--container-bg)', color: 'var(--text-color)' }}>
<div className="flex-grow-1">
  <div className="mb-2" style={{ fontSize: '15px' }}>
    <strong>{entry.date}</strong> — <span style={{ textTransform: 'capitalize' }}>{entry.mood}</span>, {t('pulse')}: <strong>{entry.pulse}</strong>
  </div>
  <div className="d-flex flex-wrap gap-2 align-items-center">
    <Link
      to={`/entries/${entry.id}`}
      className="btn btn-sm"
      style={{ ...buttonBaseStyle, backgroundColor: 'var(--btn-primary-bg)' }}
    >
      {t('view_details')}
    </Link>
    <Link
      to={`/entries/${entry.id}/edit`}
      className="btn btn-sm"
      style={{ ...buttonBaseStyle, backgroundColor: '#10b981' /* green */ }}
    >
      {t('edit')}
    </Link>
    <button
      onClick={() => handleDelete(entry.id)}
      className="btn btn-sm"
      style={{ ...buttonBaseStyle, backgroundColor: 'var(--btn-danger-bg)' }}
    >
      {t('delete')}
    </button>
  </div>
</div>


          </li>
        ))}
      </ul>

      <div className="d-flex justify-content-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`btn btn-sm ${page === i + 1 ? 'btn-primary' : 'btn-outline-primary'} mx-1`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EntriesPage;
