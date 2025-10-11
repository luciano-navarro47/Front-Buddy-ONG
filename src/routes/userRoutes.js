import React from "react";
import { PrivateRoute } from "../components/PrivateRoute/PrivateRoute";
import FormPostPet from "../components/FormPostPet/FormPostPet";
import MyPetsList from "components/account/pets/MyPetsList";
import AccountLayout from "components/account/AccountLayout";
import Veterinaries from "components/Veterinaries/Veterinaries";
import ProfileForm from "components/account/profile/ProfileForm";

export const userRoutes = ({ user, setUser, handleLogout }) => [
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
      { index: true, element: <ProfileForm user={user} setUser={setUser} /> },

      // Common user section
      { path: "myPets", element: <MyPetsList user={user} /> },
      {
        path: "myPets/:id",
        element: <FormPostPet isUpdating={true} userRole={user?.role} />,
      },
      {
        path: "profile",
        element: <ProfileForm user={user} setUser={setUser} />,
      },
      {
        path: "veterinaries",
        element: (
          <PrivateRoute roles={["admin"]}>
            <Veterinaries />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <div>No match for nested route</div>,
      },
    ],
  },
];
