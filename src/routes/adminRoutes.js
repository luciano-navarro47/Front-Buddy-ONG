import React from "react";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import DashboardAdmin from "../components/DashboardAdmin/DashboardAdmin/DashboardAdmin";
import FormPostProduct from "../components/DashboardAdmin/Dashboard/FormPostProduct";
import FormAffiliateVets from "../components/DashboardAdmin/Dashboard/FormAffiliateVets";

export const adminRoutes = ({
  user,
  setUser,
  closeSession,
  isAuthenticated,
  loginWithRedirect,
}) => [
  // To guest and registered users
  {
    path: "/dashboard",
    element: (
      <PrivateRoute roles={["admin"]} redirectPath="/">
        <DashboardAdmin
          user={user}
          setUser={setUser}
          closeSession={closeSession}
          isAuthenticated={isAuthenticated}
          loginWithRedirect={loginWithRedirect}
        />
      </PrivateRoute>
    ),
  },
  {
    path: "/dashboard/createProduct",
    element: (
      <PrivateRoute roles={["admin"]} redirectPath="/">
        <FormPostProduct />
      </PrivateRoute>
    )
  },
  {
    path: "/dashboard/updateProduct/:id",
    element: (
      <PrivateRoute roles={["admin"]} redirectPath="/">
        <FormPostProduct />
      </PrivateRoute>
    )
  },
  {
    path: "/dashboard/createVet",
    element: (
      <PrivateRoute roles={["admin"]} redirectPath="/">
        <FormAffiliateVets/>
      </PrivateRoute>
    )
  }
];
