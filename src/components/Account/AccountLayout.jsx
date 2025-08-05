import { Flex, Box, Image } from "@chakra-ui/react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import logo from "../../assets/imagenes/logo_negro.png";

export default function AccountLayout({ user, setUser, handleLogout }) {
  const navigate = useNavigate();
  return (
    <Flex h="100vh">
      <Box w="240px" bg="gray.50" p="4">
        <Flex justify="center" align="center" mb="4" h="6rem">
          <Image
            src={logo}
            boxSize="5rem"
            cursor="pointer"
            onClick={() => navigate("/")}
          />
        </Flex>
        <Sidebar user={user} handleLogout={handleLogout} />
      </Box>
      <Box flex="1" p="3" overflow="auto">
        <Outlet />
      </Box>
    </Flex>
  );
}
