import React from "react";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import { UsersTable } from "components/account/admin/users/UsersTable";
import AccountLayout from "components/account/AccountLayout";

export const adminRoutes = ({
  user,
  setUser,
  handleLogout,
}) => [
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
    ],
  },
];
