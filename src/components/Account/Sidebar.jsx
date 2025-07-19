import React from "react";
import {
  VStack,
  Flex,
  Text,
  Icon,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  FaPaw,
  FaUser,
  FaUsers,
  FaBoxOpen,
  FaClinicMedical,
  FaSignOutAlt,
} from "react-icons/fa";
import { SiDatadog } from "react-icons/si";
import { MdOutlineFaceRetouchingOff } from "react-icons/md";

export default function Sidebar({ user, handleLogout }) {
  const linkBg = useColorModeValue("blue.50", "blue.900");
  const linkColor = useColorModeValue("gray.700", "gray.200");
  const activeColor = useColorModeValue("blue.600", "blue.300");

  const baseLinks = [
      { to: "myPets", label: "Mis Mascotas", icon: FaPaw },
      { to: "profile", label: "Información Personal", icon: FaUser },
  ];

  const adminLinks = [
    { to: "users", label: "Usuarios", icon: FaUsers },
    {
      to: "users/banned",
      label: "Bloqueados",
      icon: MdOutlineFaceRetouchingOff,
    },
    { to: "managePets", label: "Gestionar mascotas", icon: SiDatadog},
    { to: "products", label: "Productos", icon: FaBoxOpen },
    { to: "veterinaries", label: "Veterinarias", icon: FaClinicMedical },
  ];

  const renderLink = ({ to, label, icon }) => (
    <NavLink key={to} to={`/account/${to}`} end={false}>
      {({ isActive }) => (
        <Flex
          align="center"
          w="100%"
          px="3"
          py="2"
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

  return (
    <VStack align="start" spacing="1">
      {baseLinks.map(renderLink)}

      {user?.role === "admin" && (
        <>
          <Divider my="3" />
          <Text mt="4" mb="1" px="3" fontSize="15px" color="gray.500">
            Panel Admin
          </Text>
          {adminLinks.map(renderLink)}
        </>
      )}

      <Divider my="3"/>
      <Flex
        w="100%"
        px="3"
        py="2"
        align="center"
        cursor="pointer"
        borderRadius="md"
        color="red.500"
        onClick={() => handleLogout()}
        _hover={{ bg: "red.50" }}
      >
        <Icon as={FaSignOutAlt} mr="3" />
        <Text fontSize="sm">Cerrar sesión</Text>
      </Flex>
    </VStack>
  );
}
