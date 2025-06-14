import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetailAdmin,
  postOrUpdateProduct,
} from "../../../Redux/Actions/productActions";
import UploadImage from "./UploadImage";
import { ErrorForm, SuccedForm } from "../../FormPostPet/AlertForm/AlertForm";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  Icon,
  Container,
} from "@chakra-ui/react";
import { useEffect } from "react";

import { MdArrowBackIosNew } from "react-icons/md";

export default function FormPostProduct({ value }) {
  const dispatch = useDispatch();
  const paramsId = useParams("id");

  const product = useSelector((state) => state.productDetail);

  const [isIncomplete, setIsIncomplete] = useState(false);
  const [infoSend, setInfoSend] = useState(false);
  const [image, setImage] = useState("");
  const [input, setInput] = useState({
    name: "",
    description: "",
    category: "",
    image: "",
    price: "",
    stock: "",
  });

  console.log("IS INCOMPLETE ? ", isIncomplete);
  const errors = {
    name: "",
    description: "",
    category: "",
    image: "",
    price: "",
    stock: "",
  };

  function completeProductData() {
    if (product) {
      setInput({
        name: product?.name || "",
        description: product?.description || "",
        category: product?.category || "",
        image: product?.image || "",
        price: product?.price || 0,
        stock: product?.stock || 0,
      });
    }
  }

  function handlerErrors(e) {
    e.preventDefault();

    if (input.name === "") {
      errors.name = "Ingresá el nombre del producto.";
    }
    if (input.description === "") {
      errors.description = "¡Se debe agregar una descripcion del producto!";
    }
    if (input.category === "") {
      errors.category = "Falta elegir la categoría.";
    }
    if (input.image === "") {
      errors.image = "Selecciona una imagen.";
    }
    if (input.price < 0) {
      errors.price = "Los numeros de precios no deben ser negativos.";
    }
    if (input.stock < 0) {
      errors.stock = "No se puede pasar stock con numero negativo.";
    }
    if (
      !errors.name &&
      !errors.description &&
      !errors.category &&
      !errors.image &&
      !errors.price &&
      !errors.stock
    ) {
      setIsIncomplete(false);
      setInfoSend(true);
      handlerSubmit(e);
    } else {
      setIsIncomplete(true);
      setInfoSend(false);
    }
  }

  function handlerChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  function handlerSubmit(e) {
    e.preventDefault();

    if (
      input.name &&
      input.description &&
      input.category &&
      input.image &&
      input.price &&
      input.stock
    ) {
      if (value === undefined) {
        dispatch(postOrUpdateProduct(input, value));
        setIsIncomplete(false);
        setInfoSend(true);
        setInput({
          name: "",
          description: "",
          category: "",
          image: "",
          price: "",
          stock: "",
        });
        document.getElementById("myForm").reset();
      } else {
        dispatch(postOrUpdateProduct(input, value, paramsId.id));
        setIsIncomplete(false);
        setInfoSend(true);
      }
    } else {
      setIsIncomplete(true);
    }
  }
  
  useEffect(() => {
    dispatch(getProductDetailAdmin(paramsId.id));
  }, [dispatch]);

  useEffect(() => {
    if (value === "updateProduct") {
      completeProductData();
    }
  }, [product, value]);

  useEffect(() => {
    setInput({
      ...input,
      image: image,
    });
  }, [image]);

  return (
    <Box>
      {isIncomplete ? <ErrorForm /> : null}
      {infoSend && isIncomplete === false ? <SuccedForm /> : null}
      <form id="myForm">
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg={"brand.green.100"}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Link to={"/dashboard"}>
              <Icon
                as={MdArrowBackIosNew}
                color="orange.400"
                boxSize={7}
                _hover={{
                  color: "grey",
                  boxSize: "8",
                }}
              />
              <Icon
                as={MdArrowBackIosNew}
                color="orange.400"
                boxSize={7}
                _hover={{
                  color: "grey",
                  boxSize: "8",
                }}
              />
              <Button
                fontFamily={"body"}
                bg="base.green.100"
                color={"grey"}
                fontSize={"1.4rem"}
                _hover={{
                  color: "orange.400",
                }}
                p="0"
                mr="1rem"
              >
                {" "}
                Atrás
              </Button>
            </Link>
            {value === undefined ? (
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Añadir producto a la tienda
                </Heading>
              </Stack>
            ) : (
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Editar producto de la tienda
                </Heading>
              </Stack>
            )}
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="name" isRequired>
                      <FormLabel>Nombre</FormLabel>
                      <Input
                        placeholder="¿Que vas a vender?"
                        type="text"
                        name="name"
                        value={input.name}
                        onChange={(e) => handlerChange(e)}
                      />
                      {errors.name && <Text>{errors.name}</Text>}
                    </FormControl>
                  </Box>

                  <Box>
                    <FormControl id="price" isRequired>
                      <FormLabel>Precio (ARS)</FormLabel>
                      <Input
                        placeholder="¿Cuanto cuesta?"
                        name="price"
                        type="number"
                        key="price"
                        value={input.price}
                        onChange={(e) => handlerChange(e)}
                      />
                    </FormControl>
                  </Box>
                </HStack>

                <FormControl id="category" isRequired>
                  <FormLabel> Categoría</FormLabel>
                  <Select
                    name="category"
                    key="category"
                    value={input.category || ""}
                    onChange={(e) => handlerChange(e)}
                  >
                    <option value="indumentaria" key="indumentaria">
                      Indumentaria
                    </option>
                    <option value="tazas" key="tazas">
                      Tazas
                    </option>
                    <option value="alimentos" key="alimentos">
                      Alimentos
                    </option>
                    <option value="otros" key="otros">
                      Otros
                    </option>
                  </Select>
                </FormControl>

                <FormControl id="stock" isRequired>
                  <FormLabel>Stock</FormLabel>
                  <Input
                    placeholder="Cantidad disponible"
                    name="stock"
                    value={input.stock}
                    key="stock"
                    type="number"
                    onChange={(e) => handlerChange(e)}
                  />
                </FormControl>

                <FormControl id="description">
                  <FormLabel>Descripcion</FormLabel>
                  <Input
                    placeholder="Algún comentario sobre el producto"
                    name="description"
                    value={input.description}
                    key="description"
                    type="text"
                    onChange={(e) => handlerChange(e)}
                  />
                </FormControl>

                <FormControl id="image" isRequired>
                  <Container>
                    <h1>Imagen del producto</h1>
                  </Container>
                  <button value={input.image}>
                    <UploadImage setImage={setImage} />
                  </button>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  {value === undefined ? (
                    <Button
                      onClick={(e) => [handlerErrors(e), window.scrollTo(0, 0)]}
                      loadingText="Publicar el producto"
                      fontFamily={"body"}
                      size="lg"
                      bg={"orange.300"}
                      color={"white"}
                      _hover={{
                        bg: "orange.400",
                      }}
                    >
                      Publicar producto
                    </Button>
                  ) : (
                    <Button
                      onClick={(e) => [handlerErrors(e), window.scrollTo(0, 0)]}
                      loadingText="Modificar el producto"
                      fontFamily={"body"}
                      size="lg"
                      bg={"orange.300"}
                      color={"white"}
                      _hover={{
                        bg: "orange.400",
                      }}
                    >
                      Actualizar
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
}
