import { useState } from "react";
import LoginForm from "./components/loginForm";
import { OverlayPopup } from "./components/overlayPopup";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const handleLoginSuccess = (token: string) => {
    setIsLoggedIn(true);
    setToken(token);
    console.log("login success" ,token);
  }

  return (
    <>
      {isLoggedIn && token ? (
        <OverlayPopup token={token} />
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </>
  );
};

export default App;