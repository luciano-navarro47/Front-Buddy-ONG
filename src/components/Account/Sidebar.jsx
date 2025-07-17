import React from "react";
import { VStack, Flex, Text, Icon, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  FaPaw,
  FaUser,
  FaUsers,
  FaBoxOpen,
  FaClinicMedical,
  FaSignOutAlt,
} from "react-icons/fa";
import { 
    MdOutlineFaceRetouchingOff 
} from "react-icons/md"

export default function Sidebar({ user }) {
  const linkBg = useColorModeValue("blue.50", "blue.900");
  const linkColor = useColorModeValue("gray.700", "gray.200");

  const baseLinks = [
    { to: "pets", label: "Mis Mascotas", icon: FaPaw },
    { to: "profile", label: "Información Personal", icon: FaUser },
  ];

  const adminLinks = [
    { to: "users", label: "Usuarios", icon: FaUsers },
    { to: "users/banned", label: "Bloqueados", icon: MdOutlineFaceRetouchingOff },
    { to: "products", label: "Productos", icon: FaBoxOpen },
    { to: "veterinaries", label: "Veterinarias", icon: FaClinicMedical },
  ];

  return (
    <VStack align="start" spacing="1">
      {baseLinks.map(({ to, label, icon }) => (
        <NavLink key={to} to={to} end>
          {({ isActive }) => (
            <Flex
              align="center"
              w="100%"
              px="3"
              py="2"
              borderRadius="md"
              bg={isActive ? linkBg : "transparent"}
              color={isActive ? "blue.600" : linkColor}
              _hover={{ bg: linkBg }}
            >
              <Icon as={icon} mr="3" />
              <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"}>
                {label}
              </Text>
            </Flex>
          )}
        </NavLink>
      ))}

      {user?.role === "admin" && (
        <>
            <Text mt="4" mb="1" px="3" fontSize="xs" color="gray.500">
                Panel Admin
            </Text>
            {adminLinks.map(({ to, label, icon }) => (
                <NavLink key={to} to={to}>
                    {({ isActive }) => (
                        <Flex
                            align="center"
                            w="100%"
                            px="3"
                            py="2"
                            borderRadius="md"
                            bg={isActive ? linkBg : "transparent"}
                            color={isActive ? "blue.600" : linkColor}
                            _hover={{ bg: linkBg }}
                        >
                            <Icon as={icon} mr="3" />
                            <Text fontSize="sm" fontWeight={isActive ? "bold" : "medium"}>
                                {label}
                            </Text>
                        </Flex>
                    )}
                </NavLink>
            ))}
        </>
      )}
    </VStack>
  );
}
