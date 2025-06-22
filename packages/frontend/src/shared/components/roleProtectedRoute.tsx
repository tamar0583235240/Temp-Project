import { Navigate } from "react-router-dom";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export function RoleProtectedRoute({ children, allowedRoles }: Props): JSX.Element {
  const user = { role: 'student'};

  if (!user
   
    ) 
    {
    return <Navigate to="/login" replace />;
  }

  return children;
}