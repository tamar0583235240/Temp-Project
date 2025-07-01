// import React from 'react';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Project base viewer</h1>
//       </header>
//       <main>
//       </main>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './shared/routes/appRoutes';
import './App.css';
import SimulationPage from './pages/InterviewPage'; // או השם המדויק של הקובץ שלך


function App() {
  return (
    <div className="App">
      <SimulationPage />
    </div>
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <h1>Project base viewer</h1>
        </header>
        <main>
          <AppRoutes />
          
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
