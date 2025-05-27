// src/context/AuthContext.js
import React, { createContext, useReducer, useContext } from 'react';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null, // объект { id, name, email, password, role }
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      const loginState = {
        isAuthenticated: true,
        user: action.payload,
      };
      localStorage.setItem('auth', JSON.stringify(loginState)); // сохранить
      return loginState;

    case 'LOGOUT':
      localStorage.removeItem('auth');
      return initialState;

    case 'UPDATE_USER':
      const updatedUser = { ...state.user, ...action.payload };
      const updatedState = {
        isAuthenticated: true,
        user: updatedUser,
      };
      localStorage.setItem('auth', JSON.stringify(updatedState)); // сохранить обновлённого
      return updatedState;

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const stored = localStorage.getItem('auth');
  const [state, dispatch] = useReducer(
    authReducer,
    stored ? JSON.parse(stored) : initialState
  );

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
