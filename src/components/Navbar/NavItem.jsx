import React from "react";
import { Button } from "@chakra-ui/react";

export function NavItem({ link, onClick }) {
  return (
    <Button
      variant="link"
      fontSize="1.3rem"
      w="100%"
      textAlign="left"
      onClick={() => onClick(link)}
      _hover={{ color: "brand.green.300" }}
    >
      {link.label}
    </Button>
  );
}
