import React from "react";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import FormPostPet from "../components/FormPostPet/FormPostPet";
import Shop from "../components/Shop/Shop";
import Home from "../components/Home/Home";

export const userRoutes = ({
  user,
  setUser,
  closeSession,
  isAuthenticated,
  loginWithRedirect,
}) => [
  // To guest and registered users
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
    ),
  },
  {
    path: "/shop",
    element: <Shop />,
  },

  // Only to registered users
  {
    path: "/createPet",
    element: (
      <PrivateRoute roles={["user", "admin"]}>
        <FormPostPet />
      </PrivateRoute>
    ),
  },
];
