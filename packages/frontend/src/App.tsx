// import React from 'react';
// import './App.css';
// import UserList from './features/admin/UserList';
// import ProgressStats from './features/dashboard/components/ProgressStats'
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Project base viewer</h1>
//       </header>
//       <main>
//                 <UserList />
//                 <ProgressStats/>

//       </main>
//     </div>
//   );
// }

// export default App;


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