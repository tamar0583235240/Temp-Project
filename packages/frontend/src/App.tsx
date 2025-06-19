import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import InterviewPage from './pages/InterviewPage';

function App() {
  return (
      <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;