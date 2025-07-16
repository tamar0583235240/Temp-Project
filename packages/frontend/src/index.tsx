import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/shared/style/globals.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
<<<<<<< HEAD
import { store } from '../src/shared/store/store'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';




=======
import { store } from './features/admin/store/store.admin'; // ודאי שזה הנתיב הנכון
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

>>>>>>> Activity-Monitoring
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
<<<<<<< HEAD
  </React.StrictMode> 
=======
  </React.StrictMode>
>>>>>>> Activity-Monitoring
);

reportWebVitals();
