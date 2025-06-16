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
import './App.css';
import UserList from './features/admin/UserList';
import ProgressStats from './features/dashboard/components/ProgressStats';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>
        <UserList />
        <ProgressStats /> {/* בלי userId */}
      </main>
    </div>
  );
}

export default App;

