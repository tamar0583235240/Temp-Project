// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// reportWebVitals();



// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { Provider } from 'react-redux';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { store } from './features/admin/store/store';
// import React from 'react';

// const queryClient = new QueryClient();

// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );

// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>
//         <App />
//       </QueryClientProvider>
//     </Provider>
//   </React.StrictMode>
// );

// reportWebVitals();






import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './features/admin/store/store.admin'; // ודאי שזה הנתיב הנכון
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();