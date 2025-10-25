import React from "react";
import Home from "../components/home/Home";
import AboutUs from "../components/about-us/AboutUs";
import DonationPage from "../components/donation/DonationPage";
import VetsList from "../components/veterinaries/VetsList";
import VetDetail from "../components/veterinaries/VetDetail";
import PetsPostedList from "../components/pets-posted/PetsPostedList";
import Details from "components/pets-posted/PetDetail";
import RegisterUserForm from "../components/auth/register-user-form/RegisterUserForm";
import Shop from "components/shop/Shop";
import Cart from "components/shop/cart/Cart";
import ProductDetail from "components/shop/product-detail/ProductDetail";

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
    element: <VetsList />,
  },
  {
    path: "/veterinary/:id",
    element: <VetDetail />,
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
