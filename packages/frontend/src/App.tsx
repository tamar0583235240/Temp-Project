import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';

function App() {
  return (


    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      
      <main>
      </main>
    </div>

  );
}

export default App;



