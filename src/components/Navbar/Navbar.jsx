import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/imagenes/logo_negro.png";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NavLinks from "./NavLinks";
import { mainLinks } from "./navConfig";
export default function Navbar({ user, isAuthenticated, handleLogout }) {
  const navigate = useNavigate();
  // console.log("USERRRR: ", user);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const reduxUser = useSelector((s) => s.user);

  const persistedUser = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("loggedUser"));
    } catch {
      return null;
    }
  }, []);
  
  // console.log("NAVBAR CURRENTUSER: ", reduxUser, persistedUser)

  const currentUser =
    reduxUser && Object.keys(reduxUser).length > 0 ? reduxUser : persistedUser;

  const handleLinkClick = (link) => {
    if (link.requiresAuth) {
      if (!user) {
        toast({
          title: "Acceso denegado",
          description: "Debes iniciar sesión para publicar una mascota.",
          status: "warning",
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (!user.phone) {
        toast({
          title: "Acceso denegado",
          description:
            "Debes tener un número de celular válido. Redirigiendote a tu sección de datos personales",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/updateUser");
        }, 5000);

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
      px="2rem"
      py="1rem"
      zIndex="1000"
      boxShadow="md"
    >
      <Flex h={16} alignItems="center" justifyContent="space-evenly">
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Hamburger Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <Image
          src={logo}
          boxSize="6rem"
          cursor="pointer"
          onClick={() => navigate("/")}
        />

        <NavLinks
          links={mainLinks}
          handleLinkClick={handleLinkClick}
          isOpen={isOpen}
          onClose={onClose}
        />

        {currentUser && Object.keys(currentUser).length > 0 ? (
          <Menu>
            <MenuButton
              as={Button}
              rounded={"full"}
              variant={"link"}
              cursor={"pointer"}
              minW={0}
            >
              <Avatar
                size={"md"}
                borderBlockEndColor={"brand.orange"}
                src={
                  isAuthenticated
                    ? user?.picture
                    : "https://st2.depositphotos.com/19428878/44645/v/450/depositphotos_446453832-stock-illustration-default-avatar-profile-icon-social.jpg"
                }
              />
            </MenuButton>

            <MenuList>
              <MenuItem as={NavLink} fontSize="1rem" to="/account">
                Cuenta
              </MenuItem>
              <MenuItem
                fontSize="1rem"
                onClick={() => {
                  onClose();
                  handleLogout();
                }}
              >
                Cerrar sesión
              </MenuItem>
            </MenuList>
          </Menu>
        ) : (
          <NavLink to="/login">
            <Button>Ingresar</Button>
          </NavLink>
        )}
      </Flex>
    </Box>
  );
}
