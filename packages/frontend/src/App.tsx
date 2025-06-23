import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './shared/routes/appRoutes';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Project base viewer</h1>
        </header>
        <main>
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>

  );
}

export default App;
