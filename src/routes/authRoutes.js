import React from "react";
import LandingPage from "../components/Landing/LandingPage";

export const authRoutes = ({
  user,
  setUser,
  isAuthenticated,
  loginWithRedirect,
  handleLogout,
}) => [
    {
        path: "/login",
        element: (
            <LandingPage
                user={user}
                setUser={setUser}
                isAuthenticated={isAuthenticated}
                loginWithRedirect={loginWithRedirect}
                handleLogout={handleLogout}
            />
        )
    },
];
