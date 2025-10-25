import React from "react";
import { Box, Stack, Heading, Text, Icon, Center } from "@chakra-ui/react";
import { RxDoubleArrowDown } from "react-icons/rx";
import Login from "components/auth/login/Login";

export default function LoginPanel({
  user,
  setUser,
  isAuthenticated,
  loginWithRedirect,
  handleLogout,
}) {
  return (
    <Stack
      bg="brand.green.100"
      rounded="xl"
      p={{ base: 4, sm: 6, md: 8 }}
      spacing={8}
      maxW={{ lg: "lg" }}
      boxShadow="lg"
    >
      <Stack spacing={4}>
        <Heading
          color="gray.800"
          lineHeight={1.1}
          fontFamily="heading"
          fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
          textAlign={"center"}
        >
          Formá parte de Buddy
        </Heading>

        <Center>
          <Box w="70%" textAlign="center">
            <Text color="gray.500" fontSize={{ base: "sm", sm: "md" }} fontWeight={"bold"}>
              Estamos buscando personas que aman a los animales, como vos.
            </Text>
            <Icon
              as={RxDoubleArrowDown}
              mt="1rem"
              fontSize="4rem"
              color="brand.green.300"
            />
          </Box>
        </Center>
      </Stack>

      <Login
        name="Login"
        setUser={setUser}
        user={user}
        isAuthenticated={isAuthenticated}
        loginWithRedirect={loginWithRedirect}
        handleLogout={handleLogout}
      />
    </Stack>
  );
}
