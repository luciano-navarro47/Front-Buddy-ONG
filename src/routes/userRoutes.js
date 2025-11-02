import React from "react";
import { PrivateRoute } from "components/auth/private-route/PrivateRoute";
import PetForm from "components/account/pets/form/formFields/PetForm";
import MyPetsList from "components/account/pets/MyPetsList";
import AccountLayout from "components/account/AccountLayout";
import Veterinaries from "components/veterinaries/VetsList";
import ProfileForm from "components/account/profile/ProfileForm";

export const userRoutes = ({ user, setUser, handleLogout }) => [
  // Only to registered users
  
  {
    path: "/publish-pet",
    element: (
      <PrivateRoute roles={["user", "admin"]}>
        <PetForm />
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
        element: <PetForm mode="update" isUpdating={true} userRole={user?.role} />,
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
