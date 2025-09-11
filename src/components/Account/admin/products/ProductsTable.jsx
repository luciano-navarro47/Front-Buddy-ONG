import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Image,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, CopyIcon, DeleteIcon } from "@chakra-ui/icons";
import PriceCell from "./PriceCell";
import ImageGalleryModal from "components/Modal/ImageGalleryModal";
import SectionHeader from "components/account/common/SectionHeader";
import ProductForm from "./ProductForm";
import ReusableFormModal from "components/account/common/ReusableFormModal";
import ReusableAlertDialog from "components/account/common/ReusableAlertDialog";
import DataTable from "../../common/table/DataTable";
import ActionPill from "components/account/common/buttons/ActionPill";
import { CATEGORY_LABEL_BY_VALUE } from "constants/categories";
import {
  clearProduct,
  deleteProducts,
  getAllProducts,
} from "redux/Actions/productActions";
import { useSelection, makeSelectColumn } from "utils/hooks/useSelection";

export function ProductsTable(user) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const userRole = user.user?.role;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const products = useSelector((s) => s.products.allProducts);

  const [formMode, setFormMode] = useState("create");
  const [copiedProductId, setCopiedProductId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const {
    isOpen: isImageOpen,
    onOpen: onOpenImage,
    onClose: onCloseImage,
  } = useDisclosure();
  const {
    isOpen: isFormOpen,
    onOpen: onOpenForm,
    onClose: onCloseForm,
  } = useDisclosure();
  const [modalImages, setModalImages] = useState([]);
  const [modalStartIndex, setModalStartIndex] = useState(0);
  const [modalProductId, setModalProductId] = useState(null);

  const selection = useSelection(products, {
    rowKey: "id",
  });

  const oneOrManySelected = selection.selectedArray.length === 1;

  const handleDeleteSelected = () => {
    const idsToDelete = selection.selectedArray;
    if (idsToDelete.length === 0) return;
    if (userRole !== "admin") {
      return toast({
        title: "Error",
        description:
          "Modo demo-admin activado. No se pudieron borrar los productos.",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    }

    dispatch(deleteProducts(idsToDelete));
    toast({
      title: "¡Hecho!",
      description: "Se borraron uno o más productos correctamente.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    selection.clear();
  };

  const openImagesModal = useCallback(
    (images, idx = 0, productId = null) => {
      setModalImages(images || []);
      setModalStartIndex(idx);
      setModalProductId(productId);
      onOpenImage();
    },
    [onOpenImage]
  );

  const handleOpenForm = useCallback(
    (productId) => {
      dispatch(clearProduct());
      setSelectedProductId(productId);
      setFormMode("update");
      onOpenForm();
    },
    [onOpenForm, dispatch]
  );

  const handleCopy = useCallback(
    (id) => {
      navigator.clipboard.writeText(id);
      setCopiedProductId(id);
      setTimeout(() => setCopiedProductId(null), 750);
    },
    [setCopiedProductId]
  );

  const handleSuccess = useCallback(() => {
    dispatch(getAllProducts());
    onCloseForm();
  }, [dispatch, onCloseForm]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const baseColumns = useMemo(
    () => [
      {
        key: "id",
        header: "Id",
        initialWidth: 50,

        renderCell: (value, row) => {
          const productId = row.id;

          return (
            <Flex align="center" justify="center" w="fit-content" minW="0">
              <Tooltip
                label="ID Copiado"
                placement="top"
                hasArrow
                isOpen={copiedProductId === productId}
                borderRadius="md"
              >
                <CopyIcon
                  cursor="pointer"
                  mr={1}
                  boxSize={4}
                  color={copiedProductId === productId ? "orange" : "black"}
                  onClick={() => handleCopy(productId)}
                />
              </Tooltip>
              {value}
            </Flex>
          );
        },
      },
      {
        key: "images",
        header: "IMAGEN",
        initialWidth: 75,
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
        header: "NOMBRE",
        initialWidth: 175,
        renderCell: (_, row) => {
          return (
            <Text
              align="left"
              fontWeight="bold"
              textDecoration="underline"
              color="blue.500"
              cursor="pointer"
              onClick={() => handleOpenForm(row.id)}
              _hover={{ color: "blue.400" }}
            >
              {row.name}
            </Text>
          );
        },
      },
      {
        key: "price",
        header: "PRECIO",
        initialWidth: 100,
        renderCell: (_, row) => <PriceCell row={row} userRole={userRole} />,
      },
      {
        key: "stock",
        header: "STOCK",
        initialWidth: 100,
        renderCell: (_, row) => {
          return <Text align="center">{row.stock}</Text>;
        },
      },
      {
        key: "category",
        header: "CATEGORIA",
        initialWidth: 150,
        renderCell: (_, row) => {
          const label = CATEGORY_LABEL_BY_VALUE[row.category] || row.category;
          return <Text align="left">{label}</Text>;
        },
      },
      {
        key: "description",
        header: "DESCRIPCIÓN",
        initialWidth: 250,
        renderCell: (_, row) => {
          return <Text align="left">{row.description}</Text>;
        },
      },
    ],
    [copiedProductId, openImagesModal, handleOpenForm, handleCopy]
  );

  const selectCol = useMemo(() => {
    return makeSelectColumn({
      selection,
      rowKey: "id",
      ariaLabelPrefix: "Producto",
    });
  }, [selection]);

  const memoColumns = useMemo(() => {
    return [selectCol, ...baseColumns];
  }, [selectCol, baseColumns]);

  return (
    <>
      <ReusableAlertDialog
        isOpen={isOpen}
        onClose={onClose}
        title="Aplicar cambios masivos"
        message={`¿Estás seguro/a de aplicar todos los cambios realizados?\n\nSe ${
          oneOrManySelected ? "borrará" : "borrarán"
        } (${selection.selectedArray.length}) ${
          oneOrManySelected ? "un producto" : "productos"
        }.\n\nEsta acción no se puede deshacer.`}
        onConfirm={() => handleDeleteSelected()}
      />
      <ImageGalleryModal
        isOpen={isImageOpen}
        onClose={onCloseImage}
        images={modalImages}
        startIndex={modalStartIndex}
        title="Fotos del Producto"
        onViewDetails={(index) => {
          onCloseImage();
          if (modalProductId) navigate(`/product/detail/${modalProductId}`);
        }}
      />
      <SectionHeader
        title='Gestionar productos de la "Tienda Virtual"'
        subtitle={`Tabla con información de los productos. Editá el stock, añadí imagenes, actualizá datos o eliminá productos de la tienda.`}
      />
      <Flex align="center" justify="space-between" wrap="wrap">
        <ActionPill colorScheme="orange" count={products.length}>
          <strong>Productos:</strong>
        </ActionPill>

        <ActionPill
          icon={<AddIcon boxSize={4} ml={0.5} color="blackAlpha.600" />}
          onClick={() => {
            dispatch(clearProduct());
            setSelectedProductId(null);
            setFormMode("create");
            onOpenForm();
          }}
        ></ActionPill>

        <ActionPill
          icon={<DeleteIcon boxSize={4} mb={1} color="white" />}
          bg="red.500"
          color="white"
          onClick={onOpen}
          isDisabled={selection.count === 0}
          _hover={{ bg: "red.600" }}
        >
          Borrar ({selection.count})
        </ActionPill>
      </Flex>

      <DataTable columns={memoColumns} data={products} rowKey="id" />

      <ReusableFormModal
        isOpen={isFormOpen}
        onClose={onCloseForm}
        formMode={formMode}
      >
        <ProductForm
          productId={selectedProductId}
          mode={formMode}
          onSuccess={handleSuccess}
          onCancel={onCloseForm}
          userRole={userRole}
        />
      </ReusableFormModal>
    </>
  );
}
