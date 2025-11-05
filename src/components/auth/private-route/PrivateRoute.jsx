import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../redux/actions/session";

export const PrivateRoute = ({
  roles = [],
  children,
  redirectPath = "/login",
}) => {
  const dispatch = useDispatch();
  const { token, expiresAt } = useSelector((state) => state.auth);
  const userRole = useSelector((state) => state.user.role);
  const now = Math.floor(Date.now() / 1000);
  const expNum = expiresAt ? Number(expiresAt) : null;
  const isAuthenticated = Boolean(token && Date.now() / 1000 < expiresAt);
  const isAuthorized = roles.length === 0 || roles.includes(userRole);

  useEffect(() => {
    if (token && expNum && now >= expNum) {
      dispatch(logout());
    }
  }, [token, expNum, now, dispatch]);

  if (!isAuthenticated || !isAuthorized) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};
