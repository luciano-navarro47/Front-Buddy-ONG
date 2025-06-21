import React from "react";
import { HStack, Stack, Box } from "@chakra-ui/react";
import { NavItem } from "./NavItem";

export default function NavLinks({ links, handleLinkClick, isOpen, onClose }) {
  return (
    <>
      {/* DESKTOP */}
      <HStack as="nav" spacing={10} display={{ base: "none", md: "flex" }}>
        {links.map((link) => (
          <NavItem key={link.to} link={link} onClick={handleLinkClick} />
        ))}
      </HStack>

      {/* MOBILE */}
      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {links.map((link) => (
              <NavItem
                key={link.to}
                link={link}
                onClick={(l) => {
                  handleLinkClick(l);
                  onClose();
                }}
              />
            ))}
          </Stack>
        </Box>
      )}
    </>
  );
}
