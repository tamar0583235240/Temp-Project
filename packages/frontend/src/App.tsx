import React from 'react';
import './App.css';
import { RecordingsList } from './features/recordings/components/recordingsList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      <RecordingsList userId={1}/>
      </header>
      <main>
      </main>
    </div>
  );
}

export default App;