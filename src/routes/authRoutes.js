import React from "react";
import LandingPage from "../components/LandingPage/LandingPage";

export const authRoutes = ({
  user,
  setUser,
  closeSession,
  isAuthenticated,
  loginWithRedirect,
}) => [
    {
        path: "/login",
        element: (
            <LandingPage
                user={user}
                setUser={setUser}
                closeSession={closeSession}
                isAuthenticated={isAuthenticated}
                loginWithRedirect={loginWithRedirect}
            />
        )
    },
];
