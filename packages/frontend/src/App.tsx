import React from 'react';
import './App.css';
// import AnalysisResult from './features/interview/components/AnalysisResult';
import AnswerAI from './features/interview/components/AnswerAI';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
        
      </header>
      {/* <AnalysisResult></AnalysisResult> */}
      <AnswerAI answerId={"f01df4e0-ccf4-488a-9d40-cfd3b7e018cb"}></AnswerAI>
      <main>
      </main>
    </div>
  );
}

export default App;