import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Project base viewer</h1>
//       </header>
//       <main>
//         <ForgotPassword />
//       </main>
//     </div>
//       <BrowserRouter>
//       <AppRoutes />
//     </BrowserRouter>
//   );
// }
