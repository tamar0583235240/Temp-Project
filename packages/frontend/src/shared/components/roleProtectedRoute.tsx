import { JSX, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Navigate } from "react-router-dom";
<<<<<<< HEAD
// import type { JSX } from "react";
import { RootState, store } from "../store/store";
import { useSelector } from "react-redux";
import { User } from "../../features/auth/types/types";
=======
import type { JSX } from "react";
>>>>>>> Activity-Monitoring

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

<<<<<<< HEAD
export function RoleProtectedRoute({ children, allowedRoles }: Props): JSX.Element | null {
  
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("משתמש לא מחובר");
      navigate("/login");
    } else if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      console.log("אין הרשאה");
      navigate("/not-authorized");
    }
  }, [user, allowedRoles, navigate]);

  if (!user) {
    return null;
=======
export function RoleProtectedRoute({ children, allowedRoles }: Props): JSX.Element {
  const user = { role: 'student'};
  if (!user
    //   || !allowedRoles.includes(user.role)
   
    ) 
    {
    return <Navigate to="/login" replace />;
>>>>>>> Activity-Monitoring
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return null;
  }

  console.log("הרשאה מאושרת, מציג תוכן");

  return children;
}
