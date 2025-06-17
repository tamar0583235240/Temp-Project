
import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'

import './App.css';
import { useAppDispatch } from './shared/hooks/reduxHooks';
import { loginSuccess } from './features/auth/store/authSlice';

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (token && userStr) {
      const user = JSON.parse(userStr);
      dispatch(loginSuccess({ token, user }));
    }
  }, []);
  
  return (
      <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;