import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Flex,
  Image,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import SectionHeader from "components/commons/display/SectionHeader";
// import ReusableAlertDialog from "components/account/common/ReusableAlertDialog";
import DataTable from "components/commons/table/DataTable";
import ImageGalleryModal from "components/commons/modal/ImageGalleryModal";
import ActionPill from "components/commons/buttons/ActionPill";
import { getPets } from "redux/actions/petActions";

export function PetsTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const toast = useToast();
  const pets = useSelector((s) => s.pets.allPets);
  console.log("PETS: ", pets);
  const [copiedPetId, setCopiedPetId] = useState(null);
  const [copiedUserRowId, setCopiedUserRowId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [modalImages, setModalImages] = useState([]);
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const [modalPetId, setModalPetId] = useState(null);

  const openImagesModal = (images, idx = 0, petId = null) => {
    setModalImages(images || []);
    setModalStartIndex(idx);
    setModalPetId(petId);
    onOpen();
  };

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
      renderCell: (value, row) => {
        const images =
          row.images && row.images.length ? row.images : [row.img || value];

        return (
          <Flex
            justify="center"
            align="center"
            w="100%"
            h="100%"
            py={1}
            overflow="visible"
            position="relative"
          >
            <Image
              src={images[0]}
              boxSize="40px"
              objectFit="cover"
              borderRadius="md"
              cursor="pointer"
              transition="transform 0.2s ease, box-shadow 0.18s ease"
              _hover={{
                transform: "scale(1.2)",
                zIndex: 1,
                boxShadow: "md",
              }}
              willChange="transform"
              alt="foto mascota"
              onClick={() => openImagesModal(images, 0, row.id)}
            />
          </Flex>
        );
      },
    },
    {
      key: "name",
      header: "Nombre",
      initialWidth: 75,
      renderCell: (value) => {
        return value ? (
          <Flex justify="center">
            <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
          </Flex>
        ) : (
          <Flex justify="center">-</Flex>
        );
      },
    },
    {
      key: "specie",
      header: "Especie",
      initialWidth: 75,
      renderCell: (value) => (
        <Flex justify="center">
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    {
      key: "sex",
      header: "Sexo",
      initialWidth: 75,
      renderCell: (value) => (
        <Flex justify="center">
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    {
      key: "age",
      header: "Edad",
      initialWidth: 75,
      renderCell: (value) => (
        <Flex justify="center">
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    {
      key: "size",
      header: "Tamaño",
      initialWidth: 75,
      renderCell: (value) => (
        <Flex justify="center">
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    // {
    //   key: "status",
    //   header: "Estado",
    //   initialWidth: 75,
    //   renderCell: (value) => (

    //     <Flex justify="center">
    //       <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
    //     </Flex>
    //   ),
    // },
    // {
    //   key: "area",
    //   header: "Ubicacion",
    //   initialWidth: 75,
    //   renderCell: (value) => (
    //     <Flex>
    //       <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
    //     </Flex>
    //   ),
    // },
    {
      key: "detail",
      header: "Detalles",
      initialWidth: 125,
      renderCell: (value, row) => (
        <Flex>
          <ExternalLinkIcon
            mr={1}
            mt={1}
            cursor="pointer"
            _hover={{ color: "blue.500" }}
            onClick={() => navigate(`/pet/detail/${row.id}`)}
          />
          <Text>{value.slice(0, 1).toUpperCase() + value.slice(1)}</Text>
        </Flex>
      ),
    },
    {
      key: "user",
      header: "Publicado por",
      initialWidth: 75,
      renderCell: (_, row) => {
        const user = row.user;
        if (!user) return <Flex justify="center">-</Flex>;

        return (
          <Box>
            <Flex justify="center" align="center" >
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
            </Flex>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      <ImageGalleryModal
        isOpen={isOpen}
        onClose={onClose}
        images={modalImages}
        startIndex={modalStartIndex}
        title="Fotos del animal"
        onViewDetails={(index) => {
          onClose();
          if (modalPetId) navigate(`/pet/detail/${modalPetId}`);
        }}
      />
      <SectionHeader
        title="Gestionar mascotas publicadas"
        subtitle="Tabla con información básica de las mascotas publicadas por los usuarios."
      />
      <ActionPill colorScheme="orange" count={pets.length}>
        <strong>Publicados:</strong>
      </ActionPill>
      <DataTable columns={columns} data={pets} rowKey="id" />
    </>
  );
}
