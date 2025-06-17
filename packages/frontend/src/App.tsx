import React from 'react';
import './App.css';
import { Feedbackes } from './features/feedback/components/feedbackes';
import { Provider } from 'react-redux';
import { store } from './shared/store/store';

function App() {
  return (
   
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
        <Feedbackes></Feedbackes>
      </header>
      <main>
      </main>
    </div>
    
  );
}

export default App;