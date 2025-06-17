import React from 'react';
import './App.css';
import FilteringComponents from './features/recordings/components/filteringComponents';
import SearchComponents from './features/recordings/components/searchComponents';
// import SearchComponents from './features/recordings/components/searchComponents';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>
      <SearchComponents/>
      <FilteringComponents/>
      </main>    
    </div>
  );
}

export default App;