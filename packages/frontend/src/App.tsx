import React from 'react';
import './App.css';
import { FileUpload } from './shared/components/FileUpload';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <FileUpload />
      <main>
      </main>
    </div>
  );
}

export default App;