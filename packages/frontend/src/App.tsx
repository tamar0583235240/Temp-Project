import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
// import SharedRecording from './features/shared-recordings/components/sharedRecording';
import SharedRecordingsComponent from './features/shared-recordings/components/SharedRecordingsComponent';

import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>

      </main>
    </div>
  );
}

export default App;