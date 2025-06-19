// זה ודאי טוב
// import React from 'react';
// import './App.css';
// import { AddNewUser } from './shared/components/Users/AddNewUser';


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Project base viewer</h1>
//       </header>
//       <AddNewUser onUserAdded={undefined}></AddNewUser>
//       <main>
//       </main>
//     </div>
//   );
// }
// export default App;


// זה וווווווווווווווווווווווווודאי עובדדדדדדדדדדדדדדדדדדדדדדדדדדדדדדדד
// import React, { useState } from 'react';
// import './App.css';
// import { AddNewUser } from './shared/components/Users/AddNewUser';

// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   isActive: boolean;
// }

// function App() {
//   const [users, setUsers] = useState<User[]>([]);

//   const handleUserAdded = (newUser: User) => {
//     setUsers((prevUsers) => [...prevUsers, newUser]);
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Project Base Viewer</h1>
//       </header>

//       <AddNewUser onUserAdded={handleUserAdded} />

//       <main style={{ marginTop: '30px' }}>
//         <h2>Users List</h2>
//         {users.length === 0 ? (
//           <p>No users added yet.</p>
//         ) : (
//           <ul style={{ listStyle: 'none', padding: 0 }}>
//             {users.map((u, index) => (
//               <li
//                 key={index}
//                 style={{
//                   background: '#f0f0f0',
//                   margin: '10px auto',
//                   padding: '10px',
//                   maxWidth: '400px',
//                   borderRadius: '8px',
//                 }}
//               >
//                 <strong>{u.firstName} {u.lastName}</strong> – {u.email} | {u.role} |{' '}
//                 {u.isActive ? '✅ Active' : '❌ Not Active'}
//               </li>
//             ))}
//           </ul>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;








// import React, { useEffect, useState } from 'react';
// import './App.css';
// import axios from 'axios';
// import { AddNewUser } from './shared/components/users/AddNewUser';

// interface User {
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: string;
//   isActive: boolean;
// }

// function App() {
//   const [users, setUsers] = useState<User[]>([]);

//   const handleUserAdded = (newUser: User) => {
//     setUsers((prevUsers) => [...prevUsers, newUser]);
//   };

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         // 5001
//         const res = await axios.get('http://localhost:5000/api/users');
//         setUsers(res.data.users);
//       } catch (error) {
//         console.error('Error fetching users', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Project Base Viewer</h1>
//       </header>

//       <AddNewUser onUserAdded={handleUserAdded} />

//       <main style={{ marginTop: '30px' }}>
//         <h2>Users List</h2>
//         {users.length === 0 ? (
//           <p>No users added yet.</p>
//         ) : (
//           <ul style={{ listStyle: 'none', padding: 0 }}>
//             {users.map((u, index) => (
//               <li
//                 key={index}
//                 style={{
//                   background: '#f0f0f0',
//                   margin: '10px auto',
//                   padding: '10px',
//                   maxWidth: '400px',
//                   borderRadius: '8px',
//                 }}
//               >
//                 <strong>{u.firstName} {u.lastName}</strong> – {u.email} | {u.role} |{' '}
//                 {u.isActive ? '✅ Active' : '❌ Not Active'}
//               </li>
//             ))}
//           </ul>
//         )}
//       </main>
//     </div>
//   );
// }

// export default App;




// import React from 'react';
// import './App.css';
// import AddUserForm from './features/admin/components/AddNewUser';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Project base viewer</h1>
//       </header>
//       <main>
//       <AddUserForm />
//       </main>
//     </div>
//   );
// }

// export default App;





import React from 'react';
import './App.css';
import UserList from './features/admin/UserList';
import AddUserForm from './features/admin/components/AddNewUser';
import ProgressStats from './features/dashboard/components/ProgressStats';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <main>
                <AddUserForm />

        <UserList />
        <ProgressStats/> {/* בלי userId */}
      </main>
    </div>
  );
}

export default App;