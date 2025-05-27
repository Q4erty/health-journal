import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';

const UpdatePasswordPage = () => {
  const { user, dispatch } = useAuth();
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');

  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log(user.user)

    if (currentPass !== user.user.password) {
      return alert('Текущий пароль неверен');
    }
    try {
      await api.patch(`/users/${user.user.id}`, { password: newPass });
      dispatch({ type: 'UPDATE_USER', payload: { password: newPass } });
      alert('Пароль успешно обновлён');
    } catch (err) {
      alert('Ошибка при обновлении пароля');
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Смена пароля</h2>
      <input
        type="password"
        placeholder="Текущий пароль"
        value={currentPass}
        onChange={(e) => setCurrentPass(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Новый пароль"
        value={newPass}
        onChange={(e) => setNewPass(e.target.value)}
        required
      />
      <button type="submit">Обновить пароль</button>
    </form>
  );
};

export default UpdatePasswordPage;
