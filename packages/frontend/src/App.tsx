import React, { useEffect } from 'react';
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
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>
      </main>
    </div>
  );
}

export default App;