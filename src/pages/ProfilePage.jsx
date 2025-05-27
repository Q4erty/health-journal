import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/api';
import { useLang } from '../context/LanguageContext';

const ProfilePage = () => {
  const { user, dispatch } = useAuth();
  const { t } = useLang();

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
      const updatedUser = {
        ...user.user,
        ...formData
      };

      await api.patch(`/users/${user.user.id}`, updatedUser);

      dispatch({
        type: 'UPDATE_USER',
        payload: updatedUser
      });

      dispatch({ type: 'LOGOUT' });

      alert(t('profile_updated'));
    } catch (err) {
      alert(t('profile_update_error'));
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>{t('profile')}</h2>
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
          placeholder={t('name')}
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder={t('email')}
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder={t('password')}
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{t('save')}</button>
      </form>
    </div>
  );
};

export default ProfilePage;
