import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Box,
  Flex,
  Select,
  Tooltip,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import ProfileHeader from "components/account/common/ProfileHeader";
import ReusableAlertDialog from "components/ReusableAlertDialog";
import DataTable from "../dataTable/DataTable";
import { bulkSetStatusUser, getAllUsers } from "redux/Actions/userActions";

export function UsersTable() {
  const dispatch = useDispatch();
  const toast = useToast();
  const users = useSelector((s) => s.users);

  const showCustomerColumn = users.some((u) => u.customer != null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [copiedId, setCopiedId] = useState(null);
  const [pendingChanges, setPendingChanges] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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

  const handleCopy = (userId) => {
    navigator.clipboard.writeText(userId);
    setCopiedId(userId);

    setTimeout(() => {
      setCopiedId(null);
    }, 500);
  };

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

  const handleSelectChange = (userId, newStatus) => {
    handleStatusChange(userId, newStatus);
  };

  const hasChanges = changesArray.length > 0;

  const columns = [
    {
      key: "id",
      header: "ID",
      initialWidth: 50,
      renderCell: (value, row) => (
        <Flex align="center">
          <Tooltip
            label="Copiado"
            placement="top"
            hasArrow
            isOpen={copiedId === row.id}
            borderRadius="md"
          >
            <CopyIcon
              cursor="pointer"
              mr={2}
              boxSize={5}
              color={copiedId === row.id ? "orange" : "black"}
              onClick={() => handleCopy(row.id)}
            />
          </Tooltip>
          {value}
        </Flex>
      ),
    },
    {
      key: "status",
      header: "Estado",
      initialWidth: 75,
      renderCell: (_, row) => {
        const pending = pendingChanges[row.id];
        return (
          <Flex justify="center">
            <Select
              size="sm"
              maxW="120px"
              value={pending ?? row.status}
              onChange={(e) => handleSelectChange(row.id, e.target.value)}
              borderColor={pending ? "orange.400" : "gray.200"}
              borderWidth={pending ? "2px" : "1px"}
              textAlign="center"
            >
              <option value="active">Activo</option>
              <option value="banned">Bloqueado</option>
            </Select>
          </Flex>
        );
      },
    },
    {
      key: "first_name",
      header: "Nombre y apellido",
      initialWidth: 100,
      renderCell: (_, row) => `${row.first_name} ${row.last_name}`,
    },
    { key: "email", header: "Email", initialWidth: 150 },
    { key: "username", header: "Username", initialWidth: 100 },
    { key: "phone", header: "Celular", initialWidth: 100 },
    { key: "role", header: "Rol", initialWidth: 100 },
    ...(showCustomerColumn
      ? [
          {
            key: "customer",
            header: "MP Customer ID",
            initialWidth: 100,
          },
        ]
      : []),
  ];

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
        <Button
          colorScheme="teal"
          onClick={onOpen}
          isDisabled={!hasChanges}
          whiteSpace="normal"
          textAlign="center"
          px={4}
          w={{ base: "100%", sm: "auto" }}
          fontSize={{ base: "xs", sm: "md"}}
        >
          Guardar cambios ({changesArray.length})
        </Button>
      </Flex>

      <DataTable
        columns={columns}
        data={users}
        rowKey="id"
        caption={`Usuarios registrados: ${users.length}`}
      />
    </Box>
  );
}
