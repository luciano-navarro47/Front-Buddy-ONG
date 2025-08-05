import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  TableCaption,
  TableContainer,
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
    <TableContainer>
      <ProfileHeader
        title="Gestionar usuarios"
        subtitle="Ver información del usuario y cambiar su estado de actividad (bloquear/desbloquear)"
      />
      <Table
        variant="striped"
        colorScheme="blackAlpha"
        width="100%"
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
  );
}
