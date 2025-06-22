import { Navigate } from "react-router-dom";
// import { useAuthStore } from "../store/useAuthStore";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export function RoleProtectedRoute({ children, allowedRoles }: Props): JSX.Element {
  const user = { role: 'student'};//{ role: 'admin'} //  useAuthStore((state) => state.user);

  if (!user
    //   || !allowedRoles.includes(user.role)
   
    ) 
    {
    return <Navigate to="/login" replace />;
  }

  return children;
}