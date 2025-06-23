import React from 'react';
import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';





function App() {
  return (
      <MessageModalProvider>
            <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
        <main>
      </main>
      </div>
         </MessageModalProvider>

  );
}

export default App;