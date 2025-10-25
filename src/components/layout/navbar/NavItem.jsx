import React from "react";
import { Button } from "@chakra-ui/react";

export function NavItem({ link, onClick }) {
  return (
    <Button
      variant="ghost"
      fontSize={{ base: "1rem", md: "1.05rem" }}
      px={4}
      py={2}
      onClick={() => onClick(link)}
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "lg",
        color: "orange.400",
        bg: "white",
      }}
      transition="all 0.15s ease"
    >
      {link.label}
    </Button>
  );
}
