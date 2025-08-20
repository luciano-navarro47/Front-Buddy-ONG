import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDescription,
  postOrUpdateProduct,
} from "../../../../redux/Actions/productActions";
import UploadImage from "../../../DashboardAdmin/Dashboard/UploadImage";
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
  Textarea,
} from "@chakra-ui/react";
import DescriptionEditor from "components/account/common/DescriptionEditor.tsx";

export default function ProductForm({
  productId,
  mode = "create",
  onSuccess,
  onCancel,
}) {
  const dispatch = useDispatch();
  const toast = useToast();

  const product = useSelector((state) => state.products.product);

  const [isIncomplete, setIsIncomplete] = useState(false);
  const [image_url, setImage] = useState("");
  const [input, setInput] = useState({
    name: "",
    description: "",
    category: "",
    image_url: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (mode === "update" && productId) {
      dispatch(getProductDescription(productId));
    }
  }, [dispatch, productId, mode]);

  useEffect(() => {
    if (mode === "update" && product) {
      setInput({
        name: product?.name || "",
        description: product?.description || "",
        category: product?.category || "",
        image_url: product?.image_url || "",
        price: Math.round(product?.price) || 0,
        stock: product?.stock || 0,
      });
    }
  }, [product, mode]);

  useEffect(() => {
    setInput((prev) => ({ ...prev, image_url }));
  }, [image_url]);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !input.name ||
      !input.description ||
      !input.category ||
      !input.image_url ||
      input.price < 0 ||
      input.stock < 0
    ) {
      setIsIncomplete(true);
      return;
    }

    if (mode === "create") {
      await dispatch(postOrUpdateProduct(input));
    } else {
      await dispatch(postOrUpdateProduct(input, "updateProduct", productId));
    }

    toast({
      title: mode === "create" ? "Producto creado" : "Producto actualizado",
      status: "success",
      duration: 2000,
      isClosable: true,
    });

    if (onSuccess) onSuccess();
  };

  return (
    <Box as="form">
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
          >
            <option value="clothing">Ropa</option>
            <option value="toys">Juguetes</option>
            <option value="food">Comida</option>
            <option value="accessories">Accesorios</option>
            <option value="beds">Camas</option>
            <option value="hygiene">Higiene</option>
            <option value="healthcare">Salud</option>
            <option value="bowls">Platos</option>
            <option value="carriers">Transportadoras</option>
            <option value="litter">Piedritas</option>
            <option value="other">Otros</option>
          </Select>
        </FormControl>

        <HStack>
          <FormControl id="stock" isRequired>
            <FormLabel>Stock</FormLabel>
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
                type="number"
                value={input.price}
                onChange={handleChange}
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

        <FormControl id="image_url" isRequired>
          <Container>
            <FormLabel>Imágenes del producto</FormLabel>
            <UploadImage setImage={setImage} />
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
          <Button type="submit" colorScheme="orange" onClick={handleSubmit}>
            {mode === "create" ? "Publicar producto" : "Actualizar"}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
