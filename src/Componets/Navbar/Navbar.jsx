import logo from "../../assets/imagenes/logo_negro.png";
import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
// import { GiSittingDog } from "react-icons/gi";

import { useDispatch, useSelector } from "react-redux";
import { getUserId } from "../../Redux/Actions/userActions";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  // Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function Navbar({ setUser2, handleSetUserFlag }) {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { 
    isAuthenticated, 
    // authUser, 
    // logout 
  } = useAuth0();
  const [dbUser, setDbUser] = useState({});
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.dbUser);

  
  console.log("USER NAV: ", dbUser);
  console.log("STORED USER: ", localStorage.getItem("loggedUser"));

  // console.log("TOKEN SETTED: ", localStorage.getItem("authToken"));
  // console.log("IS AUTH?: ", isAuthenticated);

  const closeSession = () => {
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("authToken");
    setDbUser(null);
    handleSetUserFlag();
    // logout({ returnTo: window.location.origin });
    // navigate("/login");
  };

  const userPhone = (e) => {
    e.preventDefault();
    if (userInfo[0]?.phone === "123456789") {
      navigate("/updateUser");
      alert("Actualiza tu telefono para publicar");
    } else {
      navigate("/createPet");
    }
  };

  const userAuth = (e) => {
    e.preventDefault();
    alert("Para publicar una mascota ingresa a tu cuenta");
    navigate("/");
  };
  
  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (loggedUser) {
      setDbUser(loggedUser);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && dbUser) {
      console.log("ENTRE AL 2do TRIGGER");
      localStorage.setItem("loggedUser", JSON.stringify(dbUser));
      setDbUser(dbUser);
      dispatch(getUserId(dbUser.sub));
    }
  }, [isAuthenticated, dbUser, dispatch]);

  return (
    <>
      <Box bg="brand.green.100" px={"2rem"} py="2rem">
        <Flex h={16} alignItems={"center"} justifyContent={"space-evenly"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box>
              <NavLink to="/home">
                <Image
                  src={logo}
                  // alt="Dan Abramov"
                  boxSize="6rem"
                  mx="2rem"
                  my="1rem"
                  _hover={{
                    opacity: "0.5",
                  }}
                />
              </NavLink>
            </Box>

            <HStack
              as={"nav"}
              spacing={8}
              display={{ base: "none", md: "flex" }}
              padding="3rem"
            >
              <NavLink
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                to="/aboutUs"
                variant="custom"
              >
                <Text
                  fontSize="1.3rem"
                  fontFamily={"body"}
                  _hover={{
                    fontWeight: "bold",
                    color: "brand.green.300",
                  }}
                >
                  Nosotros
                </Text>
              </NavLink>
              <NavLink
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  color: "brand.green.300",
                }}
                to="/donate"
                variant="custom"
              >
                <Text
                  fontSize="1.3rem"
                  fontFamily={"body"}
                  _hover={{
                    fontWeight: "bold",
                    color: "brand.green.300",
                  }}
                >
                  Donaciones
                </Text>
              </NavLink>
              <NavLink
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                to="/shop"
                variant="custom"
              >
                <Text
                  fontSize="1.3rem"
                  fontFamily={"body"}
                  _hover={{
                    fontWeight: "bold",
                    color: "brand.green.300",
                  }}
                >
                  Tienda
                </Text>
              </NavLink>
              {!dbUser ? (
                <NavLink
                  onClick={(e) => userAuth(e)}
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                  }}
                  to="/createPet"
                  variant="custom"
                >
                  <Text
                    fontSize="1.3rem"
                    fontFamily={"body"}
                    _hover={{
                      fontWeight: "bold",
                      color: "brand.green.300",
                    }}
                  >
                    Publicar Mascota
                  </Text>
                </NavLink>
              ) : (
                <NavLink
                  onClick={(e) => userPhone(e)}
                  px={2}
                  py={1}
                  rounded={"md"}
                  _hover={{
                    textDecoration: "none",
                    // bg: useColorModeValue("gray.200", "gray.700"),
                  }}
                  to="/createPet"
                  variant="custom"
                >
                  <Text
                    fontSize="1.3rem"
                    fontFamily={"body"}
                    _hover={{
                      fontWeight: "bold",
                      color: "brand.green.300",
                    }}
                  >
                    Publicar Mascota
                  </Text>
                </NavLink>
              )}
              <NavLink
                px={2}
                py={1}
                rounded={"md"}
                _hover={{
                  textDecoration: "none",
                  bg: useColorModeValue("gray.200", "gray.700"),
                }}
                to="/veterinary"
                variant="custom"
              >
                <Text
                  fontSize="1.3rem"
                  fontFamily={"body"}
                  _hover={{
                    fontWeight: "bold",
                    color: "brand.green.300",
                  }}
                >
                  Veterinarias
                </Text>
              </NavLink>

              <Menu>
                <MenuButton
                  as={Button}
                  _hover={{
                    fontWeight: "bold",
                    color: "brand.green.300",
                  }}
                >
                  <Text
                    fontSize="1.3rem"
                    fontFamily={"body"}
                    _hover={{
                      fontWeight: "bold",
                      color: "brand.green.300",
                    }}
                  >
                    Mascotas
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem as={NavLink} to="/adoptions">
                    <Text fontFamily={"body"}>En adopción</Text>
                  </MenuItem>
                  <MenuItem as={NavLink} to="/lostPets">
                    <Text fontFamily={"body"}>Perdidos</Text>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
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
                      ? dbUser?.picture
                      : "https://st2.depositphotos.com/19428878/44645/v/450/depositphotos_446453832-stock-illustration-default-avatar-profile-icon-social.jpg"
                  }
                />
              </MenuButton>
              <NavLink to="/dashboard">
                <MenuItem hidden={dbUser?.role === "admin" ? false : true}>
                  Administrar cuenta
                </MenuItem>
              </NavLink>
              <MenuDivider />
              <MenuList>
                {Object.keys(dbUser) > 0 ? (
                  <>
                    <NavLink to="/updateUser">
                      <MenuItem>Modifica tus datos</MenuItem>
                    </NavLink>
                    <NavLink to="/myPets">
                      <MenuItem>Mis mascotas</MenuItem>
                    </NavLink>
                    <MenuItem onClick={() => closeSession()}>
                      Cerrar sesión
                    </MenuItem>
                  </>
                ) : (
                  <NavLink onClick={handleSetUserFlag} to="/login">
                    <MenuItem>Ingresar</MenuItem>
                  </NavLink>
                )}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={1} display={{ md: "none" }}>
            <Stack as={"nav"} p={5} spacing={6} alignItems={"center"}>
              <NavLink to="/aboutUs">
                <Text
                  fontSize="1.2rem"
                  fontFamily={"body"}
                  _hover={{
                    fontWeight: "bold",
                    color: "brand.green.300",
                  }}
                >
                  Nosotros
                </Text>
              </NavLink>
              <NavLink to="/donate">
                <Text
                  fontSize="1.2rem"
                  fontFamily={"body"}
                  _hover={{
                    fontWeight: "bold",
                    color: "brand.green.300",
                  }}
                >
                  Donaciones
                </Text>
              </NavLink>
              <NavLink to="/shop">
                <Text
                  fontSize="1.2rem"
                  fontFamily={"body"}
                  _hover={{
                    fontWeight: "bold",
                    color: "brand.green.300",
                  }}
                >
                  Tienda
                </Text>
              </NavLink>
              <NavLink to="/createPet">
                <Text
                  fontSize="1.2rem"
                  fontFamily={"body"}
                  _hover={{
                    fontWeight: "bold",
                    color: "brand.green.300",
                  }}
                >
                  Publicar Mascota
                </Text>
              </NavLink>
              <NavLink to="/veterinary">
                <Text
                  fontSize="1.2rem"
                  fontFamily={"body"}
                  _hover={{
                    fontWeight: "bold",
                    color: "brand.green.300",
                  }}
                >
                  Veterinarias
                </Text>
              </NavLink>
              <Menu>
                <MenuButton
                  _hover={{
                    fontWeight: "bold",
                    color: "brand.green.300",
                  }}
                >
                  <Text
                    fontSize="1.3rem"
                    fontFamily={"body"}
                    _hover={{
                      fontWeight: "bold",
                      color: "brand.green.300",
                    }}
                  >
                    Mascotas
                  </Text>
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <NavLink to="/adoptions">
                      <Text fontFamily={"body"}>Adopcion</Text>
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink to="/lostPets">
                      <Text fontFamily={"body"}>Perdidos</Text>
                    </NavLink>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
