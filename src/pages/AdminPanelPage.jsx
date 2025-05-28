import React, { useEffect, useState } from 'react';
import { api } from '../api/api';
import { useLang } from '../context/LanguageContext';

const AdminPanelPage = () => {
  const [users, setUsers] = useState([]);
  const { t } = useLang();

  const fetchUsers = async () => {
    const res = await api.get('/users');
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm(t('confirm_delete_user'))) {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    }
  };

  return (
    <div style={containerStyle}>
      <h2>{t('users')}</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th>ID</th>
            <th>{t('name')}</th>
            <th>{t('email')}</th>
            <th>{t('role')}</th>
            <th>{t('delete')}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="btn btn-danger"
                  style={{ padding: '6px 14px', fontSize: '13px' }}
                  onClick={() => handleDelete(u.id)}
                >
                  {t('delete')}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const containerStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '2rem',
  backgroundColor: 'var(--container-bg)',
  color: 'var(--container-text)',
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
};

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  marginTop: '1.5rem',
};

export default AdminPanelPage;
