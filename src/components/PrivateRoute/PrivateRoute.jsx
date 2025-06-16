import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearToken } from "../../redux/Actions/auth";

export const PrivateRoute = ({
  children,
  roles = [],
  redirectPath = "/login",
}) => {
  const dispatch = useDispatch();
  const { token, expiresAt } = useSelector((state) => state.auth);
  const userRole = useSelector((state) => state.user.role);
  console.log("USER ROLE: ", userRole);

  const isAuthenticated = Boolean(token && Date.now() / 1000 < expiresAt);
  const isAuthorized = roles.length === 0 || roles.includes(userRole);

  if (token && !isAuthenticated) {
    console.log("ENTRE 1")
    dispatch(clearToken());
    return <Navigate to={redirectPath} replace />;
  }

  if (!isAuthenticated || !isAuthorized) {
    console.log("ENTRE 2")
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
