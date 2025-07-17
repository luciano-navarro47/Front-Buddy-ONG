import React from "react";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import FormPostPet from "../components/FormPostPet/FormPostPet";
import FormPostUser from "../components/FormPostUser/FormPostUser";
import MyPets from "../components/MyPets/MyPets";
import AccountLayout from "components/Account/AccountLayout";

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
    ),
  },
  {
    path: "/myPets",
    element: (
      <PrivateRoute roles={["user", "admin"]}>
        <MyPets user={user} setUser={setUser} />
      </PrivateRoute>
    ),
  },
  {
    path: "/account",
    element: (
      <PrivateRoute roles={["user", "admin"]}>
        <AccountLayout user={user} setUser={setUser} />
      </PrivateRoute>
    ),
    children: [
      // Redirect to profile from /account
      // { index: true, element: <Profile user={user} setUser={setUser} /> },

      // Common user section
      { path: "pets", element: <MyPets user={user} /> },
      // { path: "profile", element: <Profile user={user} setUser={setUser} /> },

      // // Admin section
      // { path: "users", element: <Users /> },
      // { path: "users/banned", element: <BannedUsers /> },
      // { path: "products", element: <Products /> },
      // { path: "veterinaries", element: <Veterinaries /> },
    ],
  },
];
