import React from "react";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import FormPostPet from "../components/FormPostPet/FormPostPet";
import FormPostUser from "../components/FormPostUser/FormPostUser";
import MyPets from "../components/MyPets/MyPets";
import Shop from "../components/Shop/Shop";
import Home from "../components/Home/Home";

export const userRoutes = ({
  user,
  setUser,
  isAuthenticated,
  loginWithRedirect,
  handleLogout,
}) => [
  // To guest and registered users
  {
    path: "/",
    element: (
      <Home
        user={user}
        setUser={setUser}
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        handleLogout={handleLogout}
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
  {
    path: "/updateUser",
    element: (
      <PrivateRoute roles={["user", "admin"]}>
        <FormPostUser />
      </PrivateRoute>
    )
  },
  {
    path: "/myPets",
    element: (
      <PrivateRoute roles={["user", "admin"]}>
        <MyPets user={user} setUser={setUser} />
      </PrivateRoute>
    )
  }
];
