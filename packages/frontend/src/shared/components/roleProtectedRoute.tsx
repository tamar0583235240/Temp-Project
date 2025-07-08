import { JSX, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export function RoleProtectedRoute({ children, allowedRoles }: Props): JSX.Element | null {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("משתמש לא מחובר");
      navigate("/login");
    } else if (!allowedRoles.includes(user.role)) {
      console.log("אין הרשאה");
      navigate("/not-authorized");
    }
  }, [user, allowedRoles, navigate]);

  if (!user || !allowedRoles.includes(user.role)) {
    return null;
  }

  console.log("הרשאה מאושרת, מציג תוכן");
  return children;
}
