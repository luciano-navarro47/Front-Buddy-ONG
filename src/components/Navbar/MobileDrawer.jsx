import React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  Button,
  Divider,
  Text,
  Image,
} from "@chakra-ui/react";

export default function MobileDrawer({
  isOpen,
  onClose,
  logo,
  mainLinks,
  handleLinkClick,
  currentUser,
  navigate,
  handleLogout,
}) {
  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <VStack align="start" spacing={4} mt={2}>
            {mainLinks.map((link) => (
              <Button
                key={link.to}
                variant="ghost"
                width="100%"
                justifyContent="flex-start"
                onClick={() => {
                  handleLinkClick(link);
                  onClose();
                }}
              >
                <Text fontSize="sm">{link.label}</Text>
              </Button>
            ))}

            <Divider />

            {currentUser && Object.keys(currentUser).length > 0 ? (
              <>
                <Button
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                  onClick={() => {
                    navigate("/account");
                    onClose();
                  }}
                  size="sm"
                >
                  Mi cuenta
                </Button>
                <Button
                  variant="ghost"
                  width="100%"
                  justifyContent="flex-start"
                  onClick={() => {
                    handleLogout && handleLogout();
                    onClose();
                  }}
                  size="sm"
                >
                  Cerrar sesión
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                width="100%"
                justifyContent="flex-start"
                onClick={() => {
                  navigate("/login");
                  onClose();
                }}
              >
                Ingresar
              </Button>
            )}
          </VStack>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
