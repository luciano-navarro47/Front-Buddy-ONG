import React from "react";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import DashboardAdmin from "../components/DashboardAdmin/DashboardAdmin/DashboardAdmin";

export const adminRoutes = ({
  user,
  setUser,
  closeSession,
  isAuthenticated,
  loginWithRedirect,
}) => [
  // To guest and registered users
  {
    path: "/dashboard",
    element: (
      <PrivateRoute roles={["admin"]} redirectPath="/">
        <DashboardAdmin
          user={user}
          setUser={setUser}
          closeSession={closeSession}
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
        />
      </PrivateRoute>
    ),
  },
];
