import type { JSX } from "react";
import { RootState, store } from "../store/store";
import { useSelector } from "react-redux";
import { User } from "../../features/auth/types/types";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
  allowedRoles: string[];
}

export function RoleProtectedRoute({ children, allowedRoles }: Props): JSX.Element {
  const user: User|null = useSelector((state: RootState) => state.auth.user);
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" replace />;
  }
  return children;
  
}
