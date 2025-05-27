// src/pages/ProfilePage.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';

const ProfilePage = () => {
  const { user, dispatch } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
  });

  useEffect(() => {
    if (user.user) {
      setFormData({
        name: user.user.name || '',
        email: user.user.email || '',
        password: user.user.password || '',
        avatar: user.user.avatar || '',
      });
    }
  }, [user.user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        avatar: reader.result,
      }));
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const updatedData = {
            ...user, // ← это важно!
            ...formData, // обновляем только изменённые поля
          };

      await api.patch(`/users/${user.user.id}`, formData);
        dispatch({
        type: 'UPDATE_USER',
        payload: updatedData, // полный актуальный юзер
        });
      alert('Профиль обновлён');
    } catch (err) {
      alert('Ошибка при обновлении профиля');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>Профиль пользователя</h2>
      {formData.avatar && (
        <img
          src={formData.avatar}
          alt="avatar"
          style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '1rem' }}
        />
      )}
      <form onSubmit={handleUpdate}>
        <input
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
        />
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Почта"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Сохранить</button>
      </form>
    </div>
  );
};

export default ProfilePage;
