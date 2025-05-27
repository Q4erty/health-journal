import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import AdminRoute from './components/AdminRoute';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import EntriesPage from './pages/EntriesPage';
import NewEntryPage from './pages/NewEntryPage';
import EditEntryPage from './pages/EditEntryPage';
import EntryDetailPage from './pages/EntryDetailPage';
import AdminPanelPage from './pages/AdminPanelPage';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

function App() {
  const {user} = useAuth();
  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/update-password" element={<UpdatePasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/entries" element={<EntriesPage />} />
          <Route path="/entries/new" element={<NewEntryPage />} />
          <Route path="/entries/:id" element={<EntryDetailPage />} />
          <Route path="/entries/:id/edit" element={<EditEntryPage />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPanelPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
