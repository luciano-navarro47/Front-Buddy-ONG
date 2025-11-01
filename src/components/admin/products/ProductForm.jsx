import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Text,
  Select,
  Container,
  useToast,
  InputLeftElement,
  InputGroup,
  Spinner,
} from "@chakra-ui/react";
import DescriptionEditor from "components/commons/forms/DescriptionEditor";
import UploadImages from "components/commons/inputs/UploadImages";
import { CATEGORIES } from "utils/constants/categories";
import {
  getProductDescription,
  postOrUpdateProduct,
} from "redux/actions/productActions";
import { formatPrice, parsePriceToNumber } from "utils/formatPrice";

export default function ProductForm({
  productId,
  mode = "create",
  onSuccess,
  onCancel,
  userRole,
}) {
  const dispatch = useDispatch();
  const toast = useToast();

  const product = useSelector((state) => state.products.product);
  const [loadingProduct, setLoadingProduct] = useState(mode);

  const [isIncomplete, setIsIncomplete] = useState(false);
  const [images, setImages] = useState([]);
  const [input, setInput] = useState({
    name: "",
    description: "",
    category: "",
    images: [],
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (mode === "update" && productId) {
      setInput({
        name: "",
        description: "",
        category: "",
        images: [],
        price: "",
        stock: "",
      });
      setLoadingProduct(true);
      dispatch(getProductDescription(productId));
    }
  }, [dispatch, productId, mode]);

  useEffect(() => {
    if (mode === "update" && product && product.id === productId) {
      setInput({
        name: product?.name || "",
        description: product?.description || "",
        category: product?.category || "",
        images: product?.images || [],
        price: product?.price != null ? formatPrice(String(product.price)) : "",
        stock: product.stock ?? "",
      });
      setLoadingProduct(false);
    }
  }, [product, mode, productId]);

  useEffect(() => {
    setInput((prev) => ({ ...prev, images }));
  }, [images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const numberPrice = parsePriceToNumber(input.price);
    const numberStock = Number(input.stock);
  
    if (
      !input.name ||
      !input.description ||
      !input.category ||
      numberPrice < 0 ||
      numberStock < 0
    ) {
      setIsIncomplete(true);
      return;
    }
  
    if (userRole !== "admin") {
      return toast({
        title: "Error",
        status: "info",
        description: "Modo demo-admin activado. No se pueden crear productos.",
        duration: 2000,
        isClosable: true,
      });
    }
  
    const payload = {
      ...input,
      price: numberPrice,
      stock: numberStock,
    };
  
    if (mode === "create") {
      await dispatch(postOrUpdateProduct(payload));
    } else {
      await dispatch(postOrUpdateProduct(payload, "updateProduct", productId));
    }
  
    toast({
      title: mode === "create" ? "Producto creado" : "Producto actualizado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  
    if (onSuccess) onSuccess();
  };

  if (mode === "update" && loadingProduct) {
    return (
      <Box p={6} textAlign="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Box>
      <Stack spacing={4}>
        <FormControl id="name" isRequired>
          <FormLabel>Nombre</FormLabel>
          <Input
            placeholder="¿Qué vas a vender?"
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl id="category" isRequired>
          <FormLabel>Categoría</FormLabel>
          <Select
            name="category"
            value={input.category}
            onChange={handleChange}
            placeholder="Seleccioná una"
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </Select>
        </FormControl>

        <HStack>
          <FormControl id="stock" isRequired>
            <FormLabel>Stock disponible</FormLabel>
            <Input
              placeholder="Cantidad disponible"
              name="stock"
              value={input.stock}
              type="number"
              onChange={handleChange}
            />
          </FormControl>

          <FormControl id="price" isRequired>
            <FormLabel>Precio (ARS)</FormLabel>
            <InputGroup>
              <InputLeftElement>$</InputLeftElement>
              <Input
                placeholder="¿Cuánto cuesta?"
                name="price"
                inputMode="decimal"
                type="text"
                value={input.price}
                onChange={(e) => {
                  const v = e.target.value;
                  const cleaned = v.replace(/[^\d.,]/g, "");
                  setInput((prev) => ({ ...prev, price: cleaned }));
                }}
                onBlur={() => {
                  setInput((prev) => {
                    const formatted = formatPrice(prev.price);
                    return { ...prev, price: formatted };
                  });
                }}
                onFocus={() => {
                  setInput((prev) => {
                    const p = prev.price ?? "";
                    if (p === "") return prev;
                    const editable = String(p).replace(/\./g, "");
                    return { ...prev, price: editable };
                  });
                }}
              />
            </InputGroup>
          </FormControl>
        </HStack>

        <FormControl id="description">
          <FormLabel>Descripción del producto</FormLabel>
          <DescriptionEditor
            value={input.description}
            onChange={(val) => setInput({ ...input, description: val })}
            placeholder="Algún comentario sobre el producto"
          />
        </FormControl>

        <FormControl id="images" isRequired>
          <Container>
            <FormLabel>Cargar imágenes del producto</FormLabel>
            <UploadImages
              setImages={(urls) =>
                setInput((p) => ({
                  ...p,
                  images: [
                    ...(Array.isArray(p.images) ? p.images : []),
                    ...urls,
                  ],
                }))
              }
              multiple
            />
          </Container>
        </FormControl>

        {isIncomplete && (
          <Text color="red.400" fontSize="sm">
            Revisá los campos obligatorios.
          </Text>
        )}

        <Stack spacing={4} direction="row" justify="flex-end">
          {onCancel && (
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            colorScheme="orange"
            onClick={handleSubmit}
            isDisabled={input.images.length === 0}
          >
            {mode === "create" ? "Crear" : "Actualizar"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
