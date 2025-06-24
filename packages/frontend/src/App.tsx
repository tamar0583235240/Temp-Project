import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./shared/routes/appRoutes";

import "./App.css";
import { MessageModalProvider } from "./shared/ui/MessageModalContext";

import { useAppDispatch } from "./shared/hooks/reduxHooks";
import { loginSuccess } from "./features/auth/store/authSlice";
import SidebarNavigation from "./shared/ui/sidebar";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userStr =
      localStorage.getItem("user") || sessionStorage.getItem("user");
    if (token && userStr) {
      const user = JSON.parse(userStr);
      dispatch(loginSuccess({ token, user }));
    }
  }, []);

  return (
    <MessageModalProvider>
      <BrowserRouter>
        <SidebarNavigation></SidebarNavigation>
        <AppRoutes />
      </BrowserRouter>
    </MessageModalProvider>
  );
}

export default App;
