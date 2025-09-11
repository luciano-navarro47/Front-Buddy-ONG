import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
//   Button,
  //   Box,
  Flex,
  Image,
  //   Select,
  Tooltip,
  //   useToast,
  useDisclosure,
} from "@chakra-ui/react";
import { CopyIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import SectionHeader from "components/account/common/SectionHeader";
// import ReusableAlertDialog from "components/account/common/ReusableAlertDialog";
import DataTable from "../../common/table/DataTable";
import ActionPill from "components/account/common/buttons/ActionPill";
import { getAllVeterinaries } from "redux/Actions/veterinaryActions";
import ImageGalleryModal from "components/Modal/ImageGalleryModal";
import { useNavigate } from "react-router-dom";

export function VeterinariesTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const toast = useToast();
  const vets = useSelector((s) => s.vets.allVets);

  //   const { isOpen, onOpen, onClose } = useDisclosure();
  const [copiedValue, setCopiedValue] = useState(null);
  //   const [pendingChanges, setPendingChanges] = useState({});

  const {
    isOpen: isImageOpen,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();

  const [modalImages, setModalImages] = useState([]);
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const [modalVeterinaryId, setModalVeterinaryId] = useState(null);

  useEffect(() => {
    dispatch(getAllVeterinaries());
  }, [dispatch]);

  //   const changesArray = useMemo(
  //     () =>
  //       Object.entries(pendingChanges).map(([id, status]) => ({
  //         id,
  //         status,
  //       })),
  //     [pendingChanges]
  //   );

  //   const handleSave = async () => {
  //     if (changesArray.length === 0) return;

  //     try {
  //       dispatch(bulkSetStatusVet(changesArray));
  //       toast({
  //         title: "Cambios guardados",
  //         description: "El estado de las veterinarias se actualizó correctamente.",
  //         status: "success",
  //         duration: 3000,
  //         isClosable: true,
  //       });

  //       setPendingChanges({});
  //       dispatch(getAllUsers());
  //     } catch (error) {
  //       console.error(error);
  //       toast({
  //         title: "Error",
  //         description: "No se pudieron guardar los cambios.",
  //         status: "error",
  //         duration: 3000,
  //         isClosable: true,
  //       });
  //     }
  //   };

  const handleCopy = (value) => {
    navigator.clipboard.writeText(value);
    setCopiedValue(value);
    setTimeout(() => {
      setCopiedValue(null);
    }, 750);
  };

  //   const handleStatusChange = (userId, newStatus) => {
  //     const originalStatus = vets.find((u) => u.id === userId)?.status;

  //     setPendingChanges((prev) => {
  //       if (newStatus === originalStatus) {
  //         const { [userId]: _, ...rest } = prev;
  //         return rest;
  //       }

  //       return { ...prev, [userId]: newStatus };
  //     });
  //   };

  const openImagesModal = useCallback(
    (images, idx = 0, productId = null) => {
      const imagesArr = [images]; // recieve a one url in images
      setModalImages(imagesArr || []);
      setModalStartIndex(idx);
      setModalVeterinaryId(productId);
      onOpenImage();
    },
    [onOpenImage]
  );

  //   const handleSelectChange = (userId, newStatus) => {
  //     handleStatusChange(userId, newStatus);
  //   };

  //   const hasChanges = changesArray.length > 0;

  const columns = [
    {
      key: "image",
      header: "Imagen",
      initialWidth: 50,
      renderCell: (value, row) => (
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
            src={value}
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
            onClick={() => openImagesModal(value, 0, row.id)}
          />
        </Flex>
      ),
    },
    { key: "name", header: "Nombre", initialWidth: 100 },
    { key: "description", header: "Descripcion", initialWidth: 150 },
    { key: "email", header: "Email", initialWidth: 100 },
    { key: "phone", header: "Celular", initialWidth: 100 },
    { key: "address", header: "Calles", initialWidth: 100 },
    {
      key: "location",
      header: "Latitud/Longitud",
      initialWidth: 100,
      renderCell: (value) => (
        <Flex align="center">
          <Tooltip
            label="Copiado"
            placement="top"
            hasArrow
            isOpen={copiedValue === value}
            borderRadius="md"
          >
            <CopyIcon
              cursor="pointer"
              mr={1}
              boxSize={4}
              color={copiedValue === value ? "orange" : "black"}
              onClick={() => handleCopy(value)}
            />
          </Tooltip>
          {value}
        </Flex>
      ),
    },
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
            isOpen={copiedValue === row.id}
            borderRadius="md"
          >
            <CopyIcon
              cursor="pointer"
              mr={1}
              boxSize={4}
              color={copiedValue === row.id ? "orange" : "black"}
              onClick={() => handleCopy(row.id)}
            />
          </Tooltip>
          {value}
        </Flex>
      ),
    },
    {
      key: "url",
      header: "Visitar",
      initialWidth: 25,
      renderCell: (_, row) => (
        <ExternalLinkIcon
          cursor="pointer"
          boxSize={6}
          color="gray.500"
          onClick={() => navigate(`/veterinary/detail/${row.id}`)}
          _hover={{ color: "orange", boxSize: "1.6rem" }}
        />
      ),
    },
  ];

  return (
    <>
      <ImageGalleryModal
        isOpen={isImageOpen}
        onClose={onCloseImage}
        images={modalImages}
        startIndex={modalStartIndex}
        title="Fotos de la veterinaria"
        onViewDetails={(index) => {
          onCloseImage();
          if (modalVeterinaryId)
            navigate(`/veterinary/detail/${modalVeterinaryId}`);
        }}
      />
      <SectionHeader
        title="Gestionar Veterinarias"
        subtitle="Tabla con información de las veterinarias afiliadas a la organización. (Proximamente: aplicar estado 'afiliado' y 'desafiliado' para inactivar una veterinaria de ser necesario."
      />
      {/* <ReusableAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Aplicar cambios masivos"
        message={`¿Estás seguro/a de aplicar todos los cambios realizados?\n\nEsta acción no se puede deshacer.`}
        onConfirm={() => handleSave()}
      /> */}
      <ActionPill colorScheme="orange" count={vets.length}>
        <strong>Registradas:</strong>
      </ActionPill>
      {/* <Flex justify="flex-end" mb={6} mr={8}>
        <Button
          colorScheme="teal"
          onClick={onOpen}
          isDisabled={!hasChanges}
          whiteSpace="normal"
          textAlign="center"
          boxShadow="sm"
          w={{ base: "100%", sm: "auto" }}
          fontSize={{ base: "xs", sm: "md" }}
        >
          Aplicar ({changesArray.length})
        </Button>
      </Flex> */}

      <DataTable columns={columns} data={vets} rowKey="id" />
    </>
  );
}
