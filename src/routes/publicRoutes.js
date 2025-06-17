import React from "react";
import Home from "../components/Home/Home";
import AboutUs from "../components/AboutUs/AboutUs";
import Donation from "../components/Donation/Donation";
import Shop from "../components/Shop/Shop";
import Cart from "../components/Shop/Cart/Cart"

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
    element: <Donation/>
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/cart",
    element: <Cart />
  }
];
