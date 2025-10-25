import React from "react";
import { HStack, Stack, Box, Collapse } from "@chakra-ui/react";
import { NavItem } from "./NavItem";

export default function NavLinks({ links, handleLinkClick, isOpen, onClose }) {
  return (
    <>
      <HStack
        as="nav"
        spacing={6}
        display={{ base: "none", md: "flex" }}
        data-navlinks
      >
        {links.map((link) => (
          <NavItem key={link.to} link={link} onClick={handleLinkClick} />
        ))}
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <Box display={{ md: "none" }} pb={4}>
          <Stack as="nav" spacing={2}>
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
      </Collapse>
    </>
  );
}
