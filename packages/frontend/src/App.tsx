import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
// import AnalysisResult from './features/interview/components/AnalysisResult';
import AnswerAI from './features/interview/components/AnswerAI';
function App() {
  return (
<<<<<<< HEAD
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
        
      </header>
      {/* <AnalysisResult></AnalysisResult> */}
      <AnswerAI answerId={"f01df4e0-ccf4-488a-9d40-cfd3b7e018cb"}></AnswerAI>
      <main>
      </main>
    </div>
=======
      <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
>>>>>>> 76504fb4e2c2a0081963166fd24db8b55568a490
  );
}

export default App;