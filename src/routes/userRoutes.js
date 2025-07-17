import React from "react";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import FormPostPet from "../components/FormPostPet/FormPostPet";
import FormPostUser from "../components/FormPostUser/FormPostUser";
import MyPets from "../components/MyPets/MyPets";
import AccountLayout from "components/Account/AccountLayout";
import Veterinaries from "components/Veterinaries/Veterinaries";

export const userRoutes = ({
  user,
  setUser,
  handleLogout,
  // isAuthenticated,
  // loginWithRedirect,
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
        <AccountLayout
          user={user}
          setUser={setUser}
          handleLogout={handleLogout}
        />
      </PrivateRoute>
    ),
    children: [
      // Redirect to profile from /account
      { index: true, element: <FormPostUser user={user} setUser={setUser} /> },

      // Common user section
      { path: "pets", element: <MyPets user={user} /> },
      {
        path: "profile",
        element: <FormPostUser user={user} setUser={setUser} />,
      },

      // // Admin section
      // {
      //   path: "users",
      //   element: (
      //     <PrivateRoute roles={["user", "admin"]}>
      //       <Users />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "users/banned",
      //   element: (
      //     <PrivateRoute roles={["admin"]}>
      //       <BannedUsers />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "products",
      //   element: (
      //     <PrivateRoute roles={["admin"]}>
      //       <Products />
      //     </PrivateRoute>
      //   ),
      // },
      {
        path: "veterinaries",
        element: (
          <PrivateRoute roles={["admin"]}>
            <Veterinaries />
          </PrivateRoute>
        ),
      },
    ],
  },
];
