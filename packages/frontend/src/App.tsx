import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { AddQuestion } from './features/admin/components/addQuestion';
import { MessageModalProvider } from './shared/ui/MessageModalContext';





function App() {
  return (
    <MessageModalProvider>  
       <BrowserRouter>
      <AppRoutes />
      <AddQuestion></AddQuestion>
    </BrowserRouter>
    </MessageModalProvider>

  );
}

export default App;