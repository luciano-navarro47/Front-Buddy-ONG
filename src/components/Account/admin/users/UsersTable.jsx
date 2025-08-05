import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { getAllUsers } from "redux/Actions/userActions";
import ProfileHeader from "components/account/common/ProfileHeader";
import UserRow from "./UserRow";
import { ResizableTh } from "components/account/common/table/ResizableTh";

export function UsersTable() {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users);
  const showCustomer = users.some((u) => u.customer != null);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  return (
    <Box>
      <ProfileHeader
        title="Gestionar usuarios"
        subtitle="Table con información básica de cada usuario. El estado de actividad se puede alterar (bloquear/desbloquear)"
      />
      <TableContainer ml={5} mr={5}  maxH="calc(100vh - 200px)" overflowY="auto" overflowX="auto">
        <Table
          variant="striped"
          colorScheme="blackAlpha"
          sx={{ tableLayout: "fixed" }}
        >
          <TableCaption>{`Usuarios registrados en Buddy: ${users.length}`}</TableCaption>
          <Thead>
            <Tr>
              <ResizableTh initialWidth={150}>id</ResizableTh>
              <ResizableTh>nombre y apellido</ResizableTh>
              <ResizableTh>email</ResizableTh>
              <ResizableTh>username</ResizableTh>
              <ResizableTh>celular</ResizableTh>
              <ResizableTh>Rol</ResizableTh>
              <ResizableTh>Estado</ResizableTh>
              {showCustomer && <ResizableTh>Mp_customer_id</ResizableTh>}
            </Tr>
          </Thead>
          <Tbody>
            {users.map((u) => (
              <UserRow key={u.id} user={u} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
