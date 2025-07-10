<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./shared/routes/appRoutes";

import "./App.css";
import { MessageModalProvider } from "./shared/ui/MessageModalContext";
import { loginStart, loginSuccess, logout } from './features/auth/store/authSlice';
import { useRefreshTokenMutation } from './shared/api/authApi';

import { useAppDispatch } from "./shared/hooks/reduxHooks";
=======
import React from 'react';
import './App.css';

>>>>>>> bc82c02 (Merge branch 'Group3' of https://github.com/tamar0583235240/Temp-Project into Tehila-Fried)

function App() {
  const dispatch = useAppDispatch();
  const [refreshTokenTrigger] = useRefreshTokenMutation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  dispatch(loginStart());

  refreshTokenTrigger()
    .unwrap()
    .then((res) => {
      console.log("הצלחה!", res);
      dispatch(loginSuccess({ token: res.token, user: res.user }));
    })
    .catch((err) => {
      console.log("נכשל ברענון הטוקן", err);
      dispatch(logout());
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  if (loading) return <p>טוען...</p>;

  return (
<<<<<<< HEAD
    <MessageModalProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </MessageModalProvider>
=======
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>
      </main>
    </div>
>>>>>>> bc82c02 (Merge branch 'Group3' of https://github.com/tamar0583235240/Temp-Project into Tehila-Fried)
  );
}

export default App;
