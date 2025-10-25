import React from "react";
import AccountLayout from "components/account/AccountLayout";
import { PrivateRoute } from "components/auth/private-route/PrivateRoute";
import { UsersTable } from "components/admin/users/UsersTable";
import { PetsTable } from "components/admin/pets/PetsTable";
import { ProductsTable } from "components/admin/products/ProductsTable";
import { VeterinariesTable } from "components/admin/veterinaries/VeterinariesTable";


export const adminRoutes = ({ user, setUser, handleLogout }) => [
  {
    path: "/account",
    element: (
      <PrivateRoute roles={["admin", "user"]}>
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
          <PrivateRoute roles={["admin", "user"]}>
            <UsersTable user={user} />
          </PrivateRoute>
        ),
      },
      {
        path: "managePets",
        element: (
          <PrivateRoute roles={["admin", "user"]}>
            <PetsTable />
          </PrivateRoute>
        ),
      },
      {
        path: "manageProducts",
        element: (
          <PrivateRoute roles={["admin", "user"]}>
            <ProductsTable user={user} />
          </PrivateRoute>
        ),
      },
      {
        path: "manageVets",
        element: (
          <PrivateRoute roles={["admin", "user"]}>
            <VeterinariesTable />
          </PrivateRoute>
        ),
      },
    ],
  },
];
