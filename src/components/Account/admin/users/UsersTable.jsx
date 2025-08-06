import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  TableCaption,
  TableContainer,
  Box,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import UserRow from "./UserRow";
import ReusableAlertDialog from "components/ReusableAlertDialog";
import ProfileHeader from "components/account/common/ProfileHeader";
import ResizableTh from "components/account/common/table/ResizableTh";
import { bulkSetStatusUser, getAllUsers } from "redux/Actions/userActions";

export function UsersTable() {
  const dispatch = useDispatch();
  const users = useSelector((s) => s.users);
  const toast = useToast();
  const showCustomerColumn = users.some((u) => u.customer != null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pendingChanges, setPendingChanges] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleStatusChange = (userId, newStatus) => {
    const originalStatus = users.find((u) => u.id === userId)?.status;

    setPendingChanges((prev) => {
      if (newStatus === originalStatus) {
        const { [userId]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [userId]: newStatus };
    });
  };

  const changesArray = useMemo(
    () =>
      Object.entries(pendingChanges).map(([id, status]) => ({
        id,
        status,
      })),
    [pendingChanges]
  );

  const handleSave = async () => {
    if (changesArray.length === 0) return;

    try {
      dispatch(bulkSetStatusUser(changesArray));
      toast({
        title: "Cambios guardados",
        description: "El estado de los usuarios se actualizó correctamente.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setPendingChanges({});
      dispatch(getAllUsers());
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "No se pudieron guardar los cambios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const hasChanges = changesArray.length > 0;

  return (
    <Box>
      <ProfileHeader
        title="Gestionar usuarios"
        subtitle="Tabla con información básica de cada usuario. El estado de actividad se puede cambiar (bloquear/desbloquear)."
      />
      <ReusableAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Aplicar cambios masivos"
        message={`¿Estás seguro/a de aplicar todos los cambios realizados?\n\nEsta acción no se puede deshacer.`}
        onConfirm={() => handleSave()}
      />
      <Flex justify="flex-end" mb={6} mr={8}>
        <Button colorScheme="teal" onClick={onOpen} isDisabled={!hasChanges}>
          Guardar cambios ({changesArray.length})
        </Button>
      </Flex>

      <TableContainer
        ml={5}
        mr={5}
        maxH="calc(100vh - 200px)"
        overflowY="auto"
        overflowX="auto"
      >
        <Table
          variant="striped"
          colorScheme="blackAlpha"
          sx={{ tableLayout: "fixed" }}
        >
          <TableCaption>{`Usuarios registrados en Buddy: ${users.length}`}</TableCaption>
          <Thead>
            <Tr>
              <ResizableTh initialWidth={150}>id</ResizableTh>
              <ResizableTh>Estado</ResizableTh>
              <ResizableTh>nombre y apellido</ResizableTh>
              <ResizableTh>email</ResizableTh>
              <ResizableTh>username</ResizableTh>
              <ResizableTh>celular</ResizableTh>
              <ResizableTh>Rol</ResizableTh>
              {showCustomerColumn && <ResizableTh>Mp_customer_id</ResizableTh>}
            </Tr>
          </Thead>
          <Tbody>
            {users.map((u) => (
              <UserRow
                key={u.id}
                user={u}
                onStatusChange={handleStatusChange}
                pendingStatus={pendingChanges[u.id]}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
