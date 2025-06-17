import React from 'react';
import './App.css';
import ForgotPassword from './features/auth/components/ForgotPassword';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>
        <ForgotPassword />
      </main>
    </div>
  );
}

export default App;