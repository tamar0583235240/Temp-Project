import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './shared/routes/appRoutes';

import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';

import { EditInterviewMaterialsSubForm } from './features/knowledge-base/components/EditInterviewMaterialsSubForm';
import { Provider } from 'react-redux';
import { store } from './shared/store/store';


import { useAppDispatch } from './shared/hooks/reduxHooks';
import { loginStart, loginSuccess, logout } from './features/auth/store/authSlice';
import { useRefreshTokenMutation } from './shared/api/authApi';

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
    <Provider store={store}>
     <MessageModalProvider>
      <>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
       <EditInterviewMaterialsSubForm
  id="some-id" 
  defaultValues={{ title: "", shortDescription: "" }}
  onSuccess={() => console.log("Saved!")}
  onCancel={() => console.log("Cancelled")}
  />
   </>
    </MessageModalProvider>
       </Provider>
  );
}

export default App;
