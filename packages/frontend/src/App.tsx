<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./shared/routes/appRoutes";

import "./App.css";
import { MessageModalProvider } from "./shared/ui/MessageModalContext";
import { loginStart, loginSuccess, logout } from './features/auth/store/authSlice';
import { useRefreshTokenMutation } from './shared/api/authApi';
import { useAppDispatch } from "./shared/hooks/reduxHooks";

// במידה ותרצי להוסיף את הרכיב של המסקנות:
import AIInsightsList from './features/dashboard/components/AIInsightsList';
=======
// import React from 'react';
// import './App.css';
// import UserList from './features/admin/UserList';
// import ProgressStats from './features/dashboard/components/ProgressStats'
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Project base viewer</h1>
//       </header>
//       <main>
//                 <UserList />
//                 <ProgressStats/>

//       </main>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import UserList from './features/admin/UserList';
import ProgressStats from './features/dashboard/components/ProgressStats';
<<<<<<< HEAD
>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
=======
import AddUserForm from './features/admin/components/AddNewUser';
>>>>>>> f54d24c (הוספה מחיקה ועדכון)

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
        {/* אם את רוצה לראות את AIInsightsList, תוסיפי כאן זמנית */}
        {/* <AIInsightsList /> */}
        <AppRoutes />
      </BrowserRouter>
    </MessageModalProvider>
=======
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>
                <AddUserForm />

        <UserList />
        <ProgressStats /> {/* בלי userId */}
      </main>
    </div>
>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
  );
}

export default App;
<<<<<<< HEAD
=======

>>>>>>> 2d36eb4 (עדכון קבצים בפרויקט Group3)
