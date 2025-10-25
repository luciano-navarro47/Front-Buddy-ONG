import React from "react";
import Home from "../components/Home/Home";
import AboutUs from "../components/AboutUs/AboutUs";
import DonationPage from "../components/Donation/DonationPage";
import Veterinaries from "../components/Veterinaries/Veterinaries";
import VetsDetail from "../components/VetsDetail/VetsDetail";
import PetsPostedList from "../components/PetsPosted/PetsPostedList";
import Details from "components/PetsPosted/PetDetail";
import RegisterUserForm from "../components/forms/registerUserForm/RegisterUserForm";
import Shop from "components/Shop/Shop";
import Cart from "components/Shop/Cart/Cart";
import ProductDetail from "components/Shop/ProductDetail/ProductDetail";

export const publicRoutes = ({
  user,
  setUser,
  isAuthenticated,
  loginWithRedirect,
  handleLogout,
}) => [
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
    path: "/register",
    element: <RegisterUserForm setUser={setUser} />,
  },
  {
    path: "/aboutUs",
    element: <AboutUs />,
  },
  {
    path: "/donate",
    element: <DonationPage />,
  },
  {
    path: "/shop",
    element: <Shop />,
  },
  {
    path: "/shop/cart",
    element: <Cart />,
  },
  {
    path: "/shop/product/:id",
    element: <ProductDetail />,
  },
  {
    path: "/veterinary",
    element: <Veterinaries />,
  },
  {
    path: "/veterinary/:id",
    element: <VetsDetail />,
  },
  {
    path: "/pets",
    element: <PetsPostedList />,
  },
  {
    path: "/pet/detail/:id",
    element: <Details />,
  },
];
