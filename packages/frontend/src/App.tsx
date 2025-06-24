import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { AddQuestion } from './features/admin/components/addQuestion';

function App() {
  return (
      <BrowserRouter>
      <AppRoutes />
      <AddQuestion></AddQuestion>
    </BrowserRouter>
  );
}

export default App;