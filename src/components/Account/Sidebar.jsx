import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import {
  FaPaw,
  FaUser,
  FaUsers,
  FaBoxOpen,
  FaClinicMedical,
  FaSignOutAlt,
} from "react-icons/fa";
import { SiDatadog } from "react-icons/si";
import { IoIosHome } from "react-icons/io";

export default function Sidebar({ user, handleLogout }) {
  const linkBg = useColorModeValue("blue.50", "blue.900");
  const linkColor = useColorModeValue("gray.700", "gray.200");
  const activeColor = useColorModeValue("blue.600", "blue.300");

  const baseLinks = [
    { to: "/", label: "Inicio", icon: IoIosHome },
    { to: "myPets", label: "Mis Mascotas", icon: FaPaw },
    { to: "profile", label: "Información Personal", icon: FaUser },
  ];

  const adminLinks = [
    { to: "manageUsers", label: "Usuarios", icon: FaUsers },
    { to: "managePets", label: "Gestionar mascotas", icon: SiDatadog },
    { to: "manageProducts", label: "Productos", icon: FaBoxOpen },
    { to: "manageVets", label: "Veterinarias", icon: FaClinicMedical },
  ];

  const renderLink = ({ to, label, icon }) => {
    const path = to.startsWith("/") ? to : `/account/${to}`;

    return (
      <NavLink
        key={to}
        to={path}
        end={false}
        style={{ display: "block", width: "100%" }}
      >
        {({ isActive }) => (
          <Flex
            px="3"
            my="2"
            py="2"
            align="center"
            cursor="pointer"
            borderRadius="md"
            bg={isActive ? linkBg : "transparent"}
            color={isActive ? activeColor : linkColor}
            _hover={{ bg: linkBg }}
          >
            <Icon as={icon} mr="3" color={isActive ? activeColor : linkColor} />
            <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"}>
              {label}
            </Text>
          </Flex>
        )}
      </NavLink>
    );
  };

  return (
    <Flex direction="column" h="100%">
      <Box flex="1" overflowY="auto">
        {baseLinks.map(renderLink)}

        {(user?.role === "admin" || user?.role === "user") && (
          <>
            <Text pt={4} pb={1} pl={3} fontSize="sm" color="gray.500">
              Panel Administrador
            </Text>
            {adminLinks.map(renderLink)}
          </>
        )}
      </Box>

      <Flex
        w="100%"
        px="3"
        py="2"
        align="center"
        cursor="pointer"
        borderRadius="md"
        color="red.500"
        onClick={handleLogout}
        _hover={{ bg: "red.50" }}
        bg="white"
      >
        <Icon as={FaSignOutAlt} mr="2" />
        <Text fontSize="sm">Cerrar sesión</Text>
      </Flex>
    </Flex>
  );
}
