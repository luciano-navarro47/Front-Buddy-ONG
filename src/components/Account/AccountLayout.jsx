import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AccountLayout({ user, setUser }) {
  return (
    <Flex h="100vh">
      <Box w="240px" bg="gray.50" p="4">
        <Sidebar user={user} />
      </Box>
      <Box flex="1" p="6" overflow="auto">
        <Outlet />
      </Box>
    </Flex>
  );
}
