import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';





function App() {
  return (
    <MessageModalProvider>  
       <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </MessageModalProvider>

  );
}

export default App;