import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';

function App() {
  return (


    <div className="App">
      <header className="App-header">
        <h1>Project base viewer</h1>
      </header>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      
      <main>
      </main>
    </div>

  );
}

export default App;

// --------------------------------------------------
// import React from 'react';
// import { Provider } from 'react-redux';
// import { setupListeners } from '@reduxjs/toolkit/query';
// import { configureStore } from '@reduxjs/toolkit';

// import { api } from './shared/api/api';
// import SharedRecordings from './features/shared-recordings/components/SharedRecordings';

// import './App.css';

// // הגדרת החנות (store)
// const store = configureStore({
//   reducer: {
//     [api.reducerPath]: api.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(api.middleware),
// });

// setupListeners(store.dispatch);

// function App() {
//   const userId = 'user1';

//   return (
//     <Provider store={store}>
//       <div className="App">
//         <header className="App-header">
//           <h1>Project base viewer</h1>
//         </header>

//         <main>
//           <SharedRecordings userId={userId} />
//         </main>
//       </div>
//     </Provider>
//   );
// }

// export default App;