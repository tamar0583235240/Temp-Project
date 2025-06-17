import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import InterviewComponent from "./features/interview/components/interviewComponent";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>
        <InterviewComponent/>
      </main>
    </div>
      <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;