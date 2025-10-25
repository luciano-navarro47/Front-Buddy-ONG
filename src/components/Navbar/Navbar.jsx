import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Image,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavLinks from "./NavLinks";
import { mainLinks } from "./navConfig";

import UserMenu from "./UserMenu";
import MobileDrawer from "./MobileDrawer";
import Logo from "./Logo";

export default function Navbar({ user, isAuthenticated, handleLogout }) {
  const navigate = useNavigate();
  const reduxUser = useSelector((s) => s.user);

  const { isOpen, onOpen, onClose } = (function useDisclosureWrapper() {
    const { useDisclosure } = require("@chakra-ui/react");
    return useDisclosure();
  })();

  const persistedUser = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("loggedUser"));
    } catch {
      return null;
    }
  }, []);

  const currentUser =
    reduxUser && Object.keys(reduxUser).length > 0 ? reduxUser : persistedUser;

  const userName =
    currentUser?.name ||
    currentUser?.fullName ||
    currentUser?.firstName ||
    currentUser?.username ||
    "";
  const userPicture = currentUser?.picture;

  const handleLinkClick = (link) => {
    if (link.requiresAuth) {
      if (!user) {
        window.alert("Debes iniciar sesión para publicar una mascota.");
        return;
      }
      if (!user.phone) {
        window.alert(
          "Debes tener un número de celular válido. Redirigiéndote a tus datos."
        );
        setTimeout(() => navigate("/updateUser"), 5000);
        return;
      }
    }
    navigate(link.to);
  };

  return (
    <Box
      as="header"
      position="sticky"
      top="0"
      bg="brand.green.100"
      zIndex="1000"
      boxShadow="sm"
    >
      <Container maxW="7xl" px={{ base: 2, md: 4 }}>
        <Grid
          data-navbar-grid="main"
          templateColumns={{ base: "48px 1fr 48px", md: "200px 1fr 200px" }}
          alignItems="center"
          gap={2}
          h={16}
        >
          <Box display="flex" alignItems="center" justifyContent="flex-start">
            <Box display={{ base: "flex", md: "none" }} alignItems="center">
              {currentUser && Object.keys(currentUser).length > 0 ? (
                <UserMenu
                  currentUser={currentUser}
                  userName={userName}
                  userPicture={userPicture}
                  handleLogout={handleLogout}
                />
              ) : (
                <Button size="sm" onClick={() => navigate("/login")}>
                  Ingresar
                </Button>
              )}
            </Box>

            <Box
              display={{ base: "none", md: "flex" }}
              alignItems="center"
              cursor="pointer"
              onClick={() => navigate("/")}
            >
              <Logo
                src={Image && require("../../assets/images/logo_negro.png")}
                onClick={() => navigate("/")}
              />
            </Box>
          </Box>

          <Box textAlign="center">
            <Box
              display={{ base: "block", md: "none" }}
              onClick={() => navigate("/")}
              cursor="pointer"
            >
              <Logo
                src={Image && require("../../assets/images/logo_negro.png")}
                onClick={() => navigate("/")}
              />
            </Box>

            <Box display={{ base: "none", md: "flex" }} justifyContent="center">
              <NavLinks links={mainLinks} handleLinkClick={handleLinkClick} />
            </Box>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
            data-avatar-box="1"
          >
            <Box
              display={{ base: "none", md: "flex" }}
              alignItems="center"
              justifyContent="flex-end"
              minW={{
                md: "120px",
              }}
              px={{
                md: 2,
              }}
            >
              {currentUser && Object.keys(currentUser).length > 0 ? (
                <UserMenu
                  currentUser={currentUser}
                  userName={userName}
                  userPicture={userPicture}
                  handleLogout={handleLogout}
                />
              ) : (
                <Button size="sm" onClick={() => navigate("/login")}>
                  Ingresar
                </Button>
              )}
            </Box>

            {/* mobile hamburger */}
            <Box display={{ base: "flex", md: "none" }} alignItems="center">
              <IconButton
                aria-label="Abrir menú"
                icon={<HamburgerIcon />}
                onClick={onOpen}
                size="md"
                variant="ghost"
              />
            </Box>
          </Box>
        </Grid>
      </Container>

      <MobileDrawer
        isOpen={isOpen}
        onClose={onClose}
        logo={require("../../assets/images/logo_negro.png")}
        mainLinks={mainLinks}
        handleLinkClick={handleLinkClick}
        currentUser={currentUser}
        navigate={navigate}
        handleLogout={handleLogout}
      />

      <style>
        {`
      /* Ajuste fino del layout entre 768px y 1050px */
    @media (max-width: 1050px) and (min-width: 768px) {
      /* Reduce el espacio horizontal entre los links */
      .chakra-stack[data-navlinks],
      .chakra-hstack[data-navlinks],
      .chakra-flex[data-navlinks] {
        gap: 0.5rem !important;
      }

      /* Disminuye el padding lateral de los botones de links */
      .chakra-button {
        font-size: 0.8rem !important;
        padding-inline: 0.25rem !important;
      }

      /* Ajusta el grid para dejar más espacio al avatar y evitar solapamiento */
      .chakra-container > .chakra-grid {
        grid-template-columns: 140px 1fr 160px !important;
      }

      /* Reduce el tamaño del logo levemente para que no empuje */
      .chakra-container img[alt="Buddy logo"] {
        max-width: 46px !important;
      }
    }

      /* Rango más crítico: entre 768px y 872px */
    @media (max-width: 872px) and (min-width: 768px) {
      .chakra-container > .chakra-grid {
        grid-template-columns: 120px 1fr 150px !important;
      }

      .chakra-container img[alt="Buddy logo"] {
        max-width: 40px !important;
      }
    }
  `}
      </style>
    </Box>
  );
}
