import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Flex,
  Select,
  Image,
  Text,
  Tooltip,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import SectionHeader from "components/account/common/SectionHeader";
// import ReusableAlertDialog from "components/account/common/ReusableAlertDialog";
import DataTable from "../../common/table/DataTable";
import { getPets } from "redux/Actions/petActions";

export function PetsTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  // const toast = useToast();
  const pets = useSelector((s) => s.pets.allPets);
  const [copiedPetId, setCopiedPetId] = useState(null);
  const [copiedUserRowId, setCopiedUserRowId] = useState(null);

  useEffect(() => {
    dispatch(getPets());
  }, [dispatch]);

  const handleCopy = (id, type, rowId = null) => {
    navigator.clipboard.writeText(id);

    if (type === "pet") {
      setCopiedPetId(id);
      setTimeout(() => setCopiedPetId(null), 750);
    } else if (type === "user") {
      setCopiedUserRowId(rowId);
      setTimeout(() => setCopiedUserRowId(null), 750);
    }
  };

  const columns = [
    {
      key: "id",
      header: "Id",
      initialWidth: 25,

      renderCell: (value, row) => {
        const petId = row.id;

        return (
          <Flex align="center">
            <Tooltip
              label="ID Copiado"
              placement="top"
              hasArrow
              isOpen={copiedPetId === petId}
              borderRadius="md"
            >
              <CopyIcon
                cursor="pointer"
                mr={1}
                boxSize={4}
                color={copiedPetId === petId ? "orange" : "black"}
                onClick={() => handleCopy(petId, "pet")}
              />
            </Tooltip>
            {value}
          </Flex>
        );
      },
    },
    {
      key: "img",
      header: "Foto",
      initialWidth: 50,
      renderCell: (value) => (
        <Flex justify="center" align="center" w="100%" h="100%" py={1}>
          <Image
            src={value}
            boxSize="40px"
            objectFit="cover"
            borderRadius="md"
          />
        </Flex>
      ),
    },
    {
      key: "specie",
      header: "Especie",
      initialWidth: 50,
      renderCell: (value) => (
        <Flex justify="center">
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    {
      key: "sex",
      header: "Sexo",
      initialWidth: 50,
      renderCell: (value) => (
        <Flex justify="center">
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    {
      key: "age",
      header: "Edad",
      initialWidth: 50,
      renderCell: (value) => (
        <Flex justify="center">
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    {
      key: "size",
      header: "Tamaño",
      initialWidth: 50,
      renderCell: (value) => (
        <Flex justify="center">
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    {
      key: "status",
      header: "Estado",
      initialWidth: 50,
      renderCell: (value) => (
        <Flex justify="center">
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    {
      key: "area",
      header: "Ubicacion",
      initialWidth: 50,
      renderCell: (value) => (
        <Flex>
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    {
      key: "detail",
      header: "Detalles",
      initialWidth: 100,
      renderCell: (value, row) => (
        <Flex>
          <ExternalLinkIcon 
            mr={1} 
            mt={1} 
            cursor="pointer"
            _hover={{ color: "blue.500"}}
            onClick={() => navigate(`/pet/detail/${row.id}`)}
          />
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    {
      key: "user",
      header: "Publicado por",
      initialWidth: 50,
      renderCell: (_, row) => {
        const user = row.user;

        return (
          <Flex align="center">
            {user ? (
              <>
                <Tooltip
                  label="Id Copiado"
                  placement="left"
                  hasArrow
                  isOpen={copiedUserRowId === row.id}
                  borderRadius="md"
                >
                  <CopyIcon
                    cursor="pointer"
                    mr={1}
                    boxSize={4}
                    color={copiedUserRowId === row.id ? "orange" : "black"}
                    onClick={() => handleCopy(user.id, "user", row.id)}
                  />
                </Tooltip>
                <Text>
                  {user.first_name} {user.last_name}
                </Text>
              </>
            ) : (
              <Text>-</Text>
            )}
          </Flex>
        );
      },
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
