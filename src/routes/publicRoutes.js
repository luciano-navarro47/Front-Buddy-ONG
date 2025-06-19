import React from "react";
import Home from "../components/Home/Home";
import AboutUs from "../components/AboutUs/AboutUs";
import DonationPage from "../components/Donation/DonationPage";
import Shop from "../components/Shop/Shop";
import Cart from "../components/Shop/Cart/Cart"
import Veterinaries from "../components/Veterinaries/Veterinaries";
import VetsDetail from "../components/VetsDetail/VetsDetail"
import Pets from "../components/Adoption/Pets"

export const publicRoutes = ({ user, setUser, isAuthenticated, loginWithRedirect, handleLogout }) => [
  {
    path: "/",
    element: (
      <Home
        user={user}
        setUser={setUser}
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        handleLogout={handleLogout}
      />
    ),
  },
  {
    path: "/aboutUs",
    element: <AboutUs/>
  },
  {
    path: "/donate",
    element: <DonationPage />
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/cart",
    element: <Cart />
  },
  {
    path: "/veterinary",
    element: <Veterinaries />
  },
  {
    path: "/veterinary/:id",
    element: <VetsDetail />
  },
  {
    path: "/adoptions",
    element: <Pets />
  },
  {
    path: "/lostPets",
    element: <Pets />
  }
];
