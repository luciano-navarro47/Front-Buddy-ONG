import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  List,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProductDescription } from "redux/Actions/productActions";

export default function ProductDetail({ handleSetUserFlag }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cancelRef = React.useRef();
  const product = useSelector((s) => s.products.product);
  const { id } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    dispatch(getProductDescription(id));
  }, [dispatch, id]);

  // const payMp = async () => {
  //   axios
  //     .post(`http://localhost:3001/donation`, {
  //       unit_price: product[0].price,
  //       title: product[0].name,
  //     })
  //     .then((response) => {
  //       window.open(response.data, "_blank");
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  // console.log("DETAIL PRODUCT STOCK :", product[0].stock);

  // let product = JSON.parse(localStorage.getItem("cart"))?.filter(
  //   (pr) => pr.id === product.id
  // );

  return (
    <>
      {!product ? <Spinner /> : null}
      <br />
      <Button
        fontFamily={"body"}
        borderRadius={"full"}
        size="sm"
        bg={"brand.orange"}
        color={"white"}
        textTransform={"uppercase"}
        _hover={{
          transform: "translateY(2px)",
          boxShadow: "lg",
        }}
        onClick={() => {
          navigate("/shop");
        }}
      >
        Volver a la tienda
      </Button>
      <Box minHeight={"100vh"} bg="brand.backgorund" paddingBottom={"3rem"}>
        <Container maxW={"4xl"}>
          <SimpleGrid
            columns={[1, 1, 2, 2]}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"Sin imagen"}
                src={product?.images?.length > 0 ? product.images[0] : null}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                >
                  {product.name}
                </Heading>
                <Text
                  color={useColorModeValue("gray.900", "gray.400")}
                  fontWeight={300}
                  fontSize={"2xl"}
                >
                  $ {product.price}
                </Text>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color={useColorModeValue("gray.500", "gray.400")}
                    fontSize={"2xl"}
                    fontWeight={"300"}
                  >
                    {product.description}
                  </Text>
                  <Text fontSize={"lg"}>
                    Gracias por colaborar, con cada compra de productos
                    solidarios estas aportando a la fundación Buddy y a miles de
                    animales de la ciudad que necesitan de ayuda economica
                  </Text>
                </VStack>

                <Box>
                  <Text
                    fontSize={{ base: "20px", lg: "22px" }}
                    color={useColorModeValue("yellow.500", "yellow.300")}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Detalles
                  </Text>

                  <List spacing={2}>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Categoria:
                      </Text>{" "}
                      {product.category}
                    </ListItem>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        Stock
                      </Text>{" "}
                      {product.stock}u
                    </ListItem>
                  </List>
                </Box>
              </Stack>

              {/* //!ACÁ ABAJO EMPIEZA LA PRUEBA DE BOTON AGREGAR AL CARRITO DESDE DETAIL 17/02/23 */}
              {product?.amount > 0 ? (
                <div>
                  <Text as={"span"} fontWeight={"bold"}>
                    Cantidad en el carrito:
                  </Text>{" "}
                  {product?.amount}u
                </div>
              ) : null}

              <Box>
                <Button
                  onClick={onOpen}
                  fontFamily={"body"}
                  borderRadius={"full"}
                  size="md"
                  bg={"brand.green.300"}
                  color={"white"}
                  _hover={{
                    transform: "translateY(2px)",
                    boxShadow: "lg",
                  }}
                >
                  {/* {stock===0?"No hay stock":"Agregar"} */}
                  {product.stock === 0
                    ? "No hay stock"
                    : product?.amount === product.stock
                    ? "Tope de stock alcanzado"
                    : "Agregar al carrito"}
                </Button>
                <AlertDialog
                  isOpen={isOpen}
                  leastDestructiveRef={cancelRef}
                  onClose={onClose}
                >
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        {product.stock === 0
                          ? "No hay stock"
                          : product?.amount === product.stock
                          ? "No nos queda más stock"
                          : "Agregar al carrito"}
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        {product.stock === 0
                          ? "Lo sentimos, pronto habrá stock del producto"
                          : product?.amount === product.stock
                          ? "Llegaste al limite actual de stock, próximamente repondremos el producto."
                          : "¿Querés agregar este producto a tu carrito?"}
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          {product.stock === 0 ||
                          product?.amount === product.stock
                            ? "Volver"
                            : "Cancelar"}
                        </Button>

                        {product.stock === 0 ||
                        product?.amount === product.stock ? null : (
                          <Button
                            color={"white"}
                            bg={"brand.orange"}
                            onClick={(e) => {
                              product[0].handlerSetCart(
                                e,
                                product.id,
                                product.price,
                                product.images,
                                product.name,
                                product.stock
                              );
                              onClose();
                            }}
                            ml={3}
                          >
                            Si, agregar
                          </Button>
                        )}
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>
              </Box>

              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"center"}
              >
                <MdLocalShipping />
                <Text>Entrega 2-3 días habiles</Text>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </>
  );
}
