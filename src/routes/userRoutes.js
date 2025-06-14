import React from "react";
import FormPostPet from "../components/FormPostPet/FormPostPet";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import Shop from "../components/Shop/Shop";

export const userRoutes = ({ user }) => [
  {
    path: "/createPet",
    element: (
      <PrivateRoute isAllowed={!!user} redirectPath="/login">
        <FormPostPet />
      </PrivateRoute>
    ),
  },
  {
    path: "/shop",
    element: (
        <PrivateRoute isAllowed={!!user} redirectPath="/login">
            <Shop/>
        </PrivateRoute>
    )
  }
];
