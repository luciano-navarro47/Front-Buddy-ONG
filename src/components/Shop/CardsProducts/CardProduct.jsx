import React from "react";
import { useNavigate } from "react-router-dom";
import "./CardProduct.css";
import {
  Box,
  useColorModeValue,
  Image,
  Heading,
  Center,
  HStack,
  Button,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";

export default function CardProduct({
  id,
  name,
  images,
  price,
  stock,
  description,
  handleSetCart,
  handleRemoveItemCart,
  currentPage,
}) {
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const product = JSON.parse(localStorage.getItem("cart"))?.filter(
    (pr) => pr.id === id
  )[0];
  const handleNavigateProduct = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (currentPage && currentPage > 1) params.set("page", String(currentPage));
    const q = params.toString();
    const url = q ? `/shop/product/${id}?${q}` : `/shop/product/${id}`;
    navigate(url);
  };
  return (
    <>
      <Box>
        <Center py={6}>
          <Box
            className="boxCardContainer"
            maxW={"320px"}
            w={"full"}
            h={"450px"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Center>
              <Image
                src={images[0]}
                borderRadius="7px"
                alt="Sin imagen"
                width={"12rem"}
                h={"8.5rem"}
                pos={"relative"}
              />
            </Center>
            <Heading
              fontSize={"1.1rem"}
              fontFamily={"heading"}
              textTransform="uppercase"
            >
              {name}
            </Heading>

            <Heading
              fontSize={"1.3rem"}
              fontWeight={"bold"}
              fontFamily={"heading"}
              textTransform="uppercase"
              color={"orange.400"}
            >
              ${price}
            </Heading>

            <Center>
              <HStack py={0}>
                <Button
                  onClick={(e) => handleNavigateProduct(e)}
                  fontFamily={"body"}
                  borderRadius={"full"}
                  width={"7rem"}
                >
                  Ver detalles
                </Button>

                <Box>
                  <Button
                    onClick={onOpen}
                    fontFamily={"body"}
                    borderRadius={"full"}
                    width={"7rem"}
                    bg={"brand.green.300"}
                    color={"white"}
                    _hover={{
                      transform: "translateY(2px)",
                      boxShadow: "lg",
                    }}
                  >
                    {stock === 0
                      ? "No hay stock"
                      : product?.amount === stock
                      ? "Max"
                      : "Agregar"}
                  </Button>
                  <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                  >
                    <AlertDialogOverlay>
                      <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                          {stock === 0
                            ? "No hay stock"
                            : product?.amount === stock
                            ? "No nos queda más stock"
                            : "Agregar al carrito"}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                          {stock === 0
                            ? "Lo sentimos, pronto habrá stock del producto"
                            : product?.amount === stock
                            ? "Llegaste al limite actual de stock, próximamente repondremos el producto."
                            : "¿Querés agregar este producto a tu carrito?"}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                          <Button ref={cancelRef} onClick={onClose}>
                            {stock === 0 || product?.amount === stock
                              ? "Volver"
                              : "Cancelar"}
                          </Button>

                          {stock === 0 || product?.amount === stock ? null : (
                            <Button
                              color={"white"}
                              bg={"brand.orange"}
                              onClick={(e) => {
                                handleSetCart(
                                  e,
                                  id,
                                  price,
                                  images,
                                  name,
                                  stock
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
              </HStack>
            </Center>
          </Box>
        </Center>
      </Box>
    </>
  );
}
