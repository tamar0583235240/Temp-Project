import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { Feedbackes } from './features/feedback/components/feedbackes';
import { AiInsightsList } from './features/recordings/components/AiInsightsList';

function App() {
  return (
     
   
    <div className="App">
       <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
      <header className="App-header">
        <h1>Project base viewer</h1>
       <Feedbackes sharedRecordingId = {"550e8400-e29b-41d4-a718-446655440000"}></Feedbackes>
      <AiInsightsList answerId = {"00000000-0000-0000-0000-000000000020"}></AiInsightsList>
      </header>
      <main>
      </main>
    </div>
    
  );
}

export default App;