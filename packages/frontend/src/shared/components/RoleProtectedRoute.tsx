import React from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  allowedRoles: string[];
}

export function RoleProtectedRoute({ children, allowedRoles }: Props): JSX.Element {
  const user = { role: 'student' };

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // אפשר להוסיף כאן בדיקה על allowedRoles אם תרצה:
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
