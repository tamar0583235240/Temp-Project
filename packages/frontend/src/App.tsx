import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './shared/routes/appRoutes'
import './App.css';
import { AddQuestion } from './features/admin/components/addQuestion';
import { MessageModalProvider } from './shared/ui/MessageModalContext';
import { AdminQuestions } from './features/admin/components/adminQuestions';


function App() {
  return (
    <MessageModalProvider>  
       <BrowserRouter>
      <AppRoutes />
      {/* <AdminQuestions allowedRoles={[]} children={undefined}></AdminQuestions> */}
    </BrowserRouter>
    </MessageModalProvider>
  );
}

export default App;