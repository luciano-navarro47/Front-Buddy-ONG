import logo from "../../assets/imagenes/logo_negro.png";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  Box,
  Flex,
  Avatar,
  HStack,
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
import { logout } from "../../redux/Actions/session";
export default function Navbar({
  user,
  setUser,
  isAuthenticated,
  handleLogout,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const userPhone = (e) => {
    e.preventDefault();
    if (user?.phone === "123456789") {
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
              <NavLink to="/">
                <Image
                  src={logo}
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
              {!user ? (
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
                      ? user?.picture
                      : "https://st2.depositphotos.com/19428878/44645/v/450/depositphotos_446453832-stock-illustration-default-avatar-profile-icon-social.jpg"
                  }
                />
              </MenuButton>
              <NavLink to="/dashboard">
                <MenuItem hidden={user?.role === "admin" ? false : true}>
                  Administrar cuenta
                  {/* WORK HERE */}
                </MenuItem>
              </NavLink>
              <MenuDivider />
              <MenuList>
                {user && Object.keys(user).length > 0 ? (
                  <>
                    <NavLink to="/updateUser">
                      <MenuItem>Modifica tus datos</MenuItem>
                    </NavLink>
                    <NavLink to="/myPets">
                      <MenuItem>Mis mascotas</MenuItem>
                    </NavLink>
                    <MenuItem onClick={() => handleLogout()}>
                      Cerrar sesión
                    </MenuItem>
                  </>
                ) : (
                  <NavLink to="/login">
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
