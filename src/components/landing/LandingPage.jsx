import React from "react";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import LandingHero from "./LandingHero";
import LoginPanel from "./LoginPanel";

export default function LandingPage({
  user,
  setUser,
  isAuthenticated,
  loginWithRedirect,
  handleLogout,
}) {
  return (
    <Box bg="white" minH="100vh">
      <Container
        as={SimpleGrid}
        maxW="7xl"
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 45 }}
      >
        {/* Hero debajo del login en mobile */}
        <Box order={{ base: 2, md: 1 }}>
          <LandingHero />
        </Box>

        {/* Login a la izquierda en desktop */}
        <Box order={{ base: 1, md: 2 }}>
          <LoginPanel
            user={user}
            setUser={setUser}
            isAuthenticated={isAuthenticated}
            loginWithRedirect={loginWithRedirect}
            handleLogout={handleLogout}
          />
        </Box>
      </Container>
    </Box>
  );
}
