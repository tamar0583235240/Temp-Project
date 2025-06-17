import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/components/login';
import Register from './features/auth/components/register';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
