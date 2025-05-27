import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';
import { useLang } from '../context/LanguageContext';

const UpdatePasswordPage = () => {
  const { user, dispatch } = useAuth();
  const { t } = useLang();
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (currentPass !== user.user.password) {
      return alert(t('incorrect_current_password'));
    }

    try {
      await api.patch(`/users/${user.user.id}`, { password: newPass });
      dispatch({ type: 'UPDATE_USER', payload: { password: newPass } });
      alert(t('password_updated'));
    } catch (err) {
      alert(t('password_update_error'));
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>{t('change_password')}</h2>
      <input
        type="password"
        placeholder={t('current_password')}
        value={currentPass}
        onChange={(e) => setCurrentPass(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder={t('new_password')}
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
        required
      />
      <button type="submit">{t('update')}</button>
    </form>
  );
};

export default UpdatePasswordPage;
