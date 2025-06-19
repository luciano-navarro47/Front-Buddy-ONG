import React from "react";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import FormPostPet from "../components/FormPostPet/FormPostPet";
import FormPostUser from "../components/FormPostUser/FormPostUser";
import MyPets from "../components/MyPets/MyPets";

export const userRoutes = ({
  user,
  setUser,
  // isAuthenticated,
  // loginWithRedirect,
  // handleLogout,
}) => [
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
  },
];
