import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';
import RemindersPage from './pages/remindersPage';
//import TimeQuestionButton from './features/reminders/components/TimeQuestionButton';


function App() {
  return (
    <MessageModalProvider>
      <BrowserRouter>
        <RemindersPage />
        {/* <TimeQuestionButton /> */}
        <AppRoutes />
      </BrowserRouter>
    </MessageModalProvider>

  );
}

export default App;