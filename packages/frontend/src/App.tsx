import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { Provider } from 'react-redux';
import { store } from './shared/store/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    </Provider>
  );
}

export default App;
