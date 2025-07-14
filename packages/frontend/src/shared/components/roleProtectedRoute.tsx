
import { JSX, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Navigate } from "react-router-dom";
// import type { JSX } from "react";
import { RootState, store } from "../store/store";
import { useSelector } from "react-redux";
import { User } from "../../features/auth/types/types";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export function RoleProtectedRoute({ children, allowedRoles }: Props): JSX.Element {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    console.log("משתמש לא מחובר - redirect to login");
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log("אין הרשאה - redirect to not-authorized");
    return <Navigate to="/not-authorized" replace />;
  }

  console.log("הרשאה מאושרת, מציג תוכן");

  return children;
}