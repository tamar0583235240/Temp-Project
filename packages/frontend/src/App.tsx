import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';
import RemindersPage from './pages/remindersPage';


function App() {
  return (
    <MessageModalProvider>
      <BrowserRouter>
        <RemindersPage />
        <AppRoutes />
      </BrowserRouter>
    </MessageModalProvider>

  );
}

export default App;