import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';
import RouteTimer from '../src/shared/routes/RouteTimer'
function App() {
  return (
    <MessageModalProvider>
      <BrowserRouter>
        <RouteTimer/>
          <AppRoutes />
      </BrowserRouter>
    </MessageModalProvider>
  );
}

export default App;
