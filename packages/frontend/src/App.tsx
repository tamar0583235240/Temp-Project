import React from 'react';
import './App.css';
import AIInsightsList from './features/dashboard/components/AIInsightsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>

      <AIInsightsList />

      </main>
    </div>
  );
}

export default App;