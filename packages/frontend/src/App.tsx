import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { MessageModalProvider } from './shared/ui/MessageModalContext';

import { EditInterviewMaterialsSubForm } from './features/knowledge-base/components/EditInterviewMaterialsSubForm';
import { Provider } from 'react-redux';
import { store } from './shared/store/store';



function App() {
  return (
    <Provider store={store}>

 
    <MessageModalProvider>
      <>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
       <EditInterviewMaterialsSubForm
  id="some-id" 
  defaultValues={{ title: "", shortDescription: "" }}
  onSuccess={() => console.log("Saved!")}
  onCancel={() => console.log("Cancelled")}
/>
      </>
    </MessageModalProvider>
       </Provider>
  );
}

export default App;