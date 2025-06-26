import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';
import TimeQuestionButton from './features/reminders/components/TimeQuestionButton';

function App() {
  return (
    <MessageModalProvider>  
       <BrowserRouter>
    <TimeQuestionButton />
      <AppRoutes />
    </BrowserRouter>
    </MessageModalProvider>

  );
}

export default App;