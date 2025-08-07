import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Box,
  Flex,
  Select,
  Image,
  Tooltip,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import SectionHeader from "components/account/common/SectionHeader";
import ReusableAlertDialog from "components/account/common/ReusableAlertDialog";
import DataTable from "../../common/table/DataTable";
import { getPets } from "redux/Actions/petActions";

export function PetsTable() {
  const dispatch = useDispatch();
  const toast = useToast();
  const pets = useSelector((s) => s.pets.allPets);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  const handleCopy = (userId) => {
    navigator.clipboard.writeText(userId);
    setCopiedId(userId);

    setTimeout(() => {
      setCopiedId(null);
    }, 750);
  };

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
      key: "img",
      header: "Foto",
      initialWidth: 100,
      renderCell: (_, row) => (
        <Box boxSize="10">
          <Image src={row.img} size />
        </Box>
      ),
    },
  ];
  return (
    <>
      <SectionHeader
        title="Gestionar mascotas publicadas"
        subtitle="Tabla con información básica de las mascotas publicadas por los usuarios."
      />

      <DataTable columns={columns} data={pets} rowKey="id" />
    </>
  );
}
