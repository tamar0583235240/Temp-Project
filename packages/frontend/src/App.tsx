import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';
import ToggleButtonComponent from './features/reminders/components/ToggleButtonComponent';





function App() {
  return (
    <MessageModalProvider>  
       <BrowserRouter>
    <ToggleButtonComponent />
      <AppRoutes />
    </BrowserRouter>
    </MessageModalProvider>

  );
}

export default App;