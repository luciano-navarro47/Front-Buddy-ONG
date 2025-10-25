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
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader>
          <Image src={logo} boxSize="36px" objectFit="contain" alt="Buddy" />
        </DrawerHeader>
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
                <Text fontSize="lg">{link.label}</Text>
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
