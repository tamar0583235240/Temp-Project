import React from 'react';
import './App.css';
import ShareButton from './features/shared-recordings/components/ShareButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>
        <ShareButton/>
      </main>
    </div>
  );
}

export default App;