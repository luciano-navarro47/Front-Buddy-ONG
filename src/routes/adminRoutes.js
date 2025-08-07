import React from "react";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import { UsersTable } from "components/account/admin/users/UsersTable";
import AccountLayout from "components/account/AccountLayout";
import { PetsTable } from "components/account/admin/pets/PetsTable";

export const adminRoutes = ({ user, setUser, handleLogout }) => [
  {
    path: "/account",
    element: (
      <PrivateRoute roles={["admin"]}>
        <AccountLayout
          user={user}
          setUser={setUser}
          handleLogout={handleLogout}
        />
      </PrivateRoute>
    ),
    children: [
      {
        path: "manageUsers",
        element: (
          <PrivateRoute roles={["admin"]}>
            <UsersTable />
          </PrivateRoute>
        ),
      },
      {
        path: "managePets",
        element: (
          <PrivateRoute roles={["admin"]}>
            <PetsTable />
          </PrivateRoute>
        ),
      },
    ],
  },
];
