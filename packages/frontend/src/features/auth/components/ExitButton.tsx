import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../shared/store/store";
import { Button } from "../../../shared/ui/button";
import { useNavigate } from "react-router-dom";

export const ExitButton = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  if (!user) return null;

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("אין טוקן, ניתוב לכניסה...");
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/auth/logout", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw err;
      }

      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error("שגיאה בהתנתקות:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading}>
      {isLoading ? "מתנתק..." : "התנתק"}
    </Button>
  );
};
