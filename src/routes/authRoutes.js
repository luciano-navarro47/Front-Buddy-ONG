import React from "react";
import Home from "../components/Home/Home";
import LandingPage from "../components/LandingPage/LandingPage";

export const authRoutes = ({
  user,
  setUser,
  closeSession,
  isAuthenticated,
  loginWithRedirect,
}) => [
    {
        path: "/",
        element: (
            <Home
                user={user}
                setUser={setUser}
                closeSession={closeSession}
                isAuthenticated={isAuthenticated}
                loginWithRedirect={loginWithRedirect}
            />
        )
    },
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
