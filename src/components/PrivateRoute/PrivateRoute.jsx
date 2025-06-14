import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({
  isAllowed,
  redirectPath = "/login",
  children,
}) => {
  if (!isAllowed) return <Navigate to={redirectPath} replace />;
  return <>{children}</>;
};
