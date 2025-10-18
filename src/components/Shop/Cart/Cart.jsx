import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import SectionHeader from "components/account/common/SectionHeader";
import {
  Box,
  Icon,
  Text,
  Center,
  SimpleGrid,
  Stack,
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
import CartCards from "./CartCards";
import PaymentCheckout from "components/PaymentCheckout";
import { createCheckout } from "redux/Actions/paymentsActions";

// Refactor notes:
// - The cart is now managed with React state (setCart) and persisted to localStorage in a single place.
// - addItem / removeItem helpers centralize the cart mutation logic and avoid repeated branches.
// - createCheckout dispatch now receives the full payload object: { cart, userInfo, currency_id, shipping_cost, metadata }
// - Removed the previous "cartFlag" trick and unnecessary empty useEffect.

export default function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cancelRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Try to read initial cart from localStorage safely
  const readInitialCart = () => {
    try {
      const raw = window.localStorage.getItem("cart");
      if (!raw) return [];
      const parsed = JSON.parse(raw);

      const normalize = (p) => {
        const price = Number(p.price);
        const amount = Number(p.amount ?? 0);
        const stock = Number(p.stock ?? 0);
        const totalFromItem = Number(p.total);
        const computedTotal = Number.isFinite(totalFromItem)
          ? totalFromItem
          : price * amount;

        const total = Number.isFinite(computedTotal)
          ? Math.round(computedTotal * 100) / 100
          : 0;

        return {
          ...p,
          price: Number.isFinite(price) ? price : 0,
          amount: Number.isFinite(amount) ? amount : 0,
          stock: Number.isFinite(stock) ? stock : 0,
          total,
        };
      };

      return Array.isArray(parsed) ? parsed.map(normalize) : [];
    } catch (err) {
      console.error("Error parsing cart from localStorage:", err);
      return [];
    }
  };

  const [cart, setCart] = useState(readInitialCart);
  const [showCheckout, setShowCheckout] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);

  const loggedUser = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("loggedUser"));
    } catch (err) {
      return null;
    }
  }, []);

  const isLogged = Boolean(loggedUser);

  // Persist cart changes to localStorage in one place
  useEffect(() => {
    try {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Error saving cart to localStorage:", err);
    }
  }, [cart]);

  // helpers
  const findIndexById = (id) => cart.findIndex((p) => p.id === id);

  const addItem = ({ id, name, image, price, stock }) => {
    const priceNum = Number(price || 0);
    const stockNum = Number(stock ?? 0);
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx !== -1) {
        // already in cart -> increase amount if stock allows
        const existing = prev[idx];
        if (existing.amount >= existing.stock) {
          alert("Se llegó al limite de stock actual");
          return prev;
        }
        const updated = [...prev];
        const newAmount = existing.amount + 1;
        const newTotal = Math.round(priceNum * newAmount * 100) / 100;
        updated[idx] = {
          ...existing,
          amount: newAmount,
          total: newTotal,
        };
        return updated;
      }

      // new product
      const product = {
        id,
        name,
        image,
        price: priceNum,
        stock: stockNum,
        amount: 1,
        total: Math.round(priceNum * 100) / 100,
      };
      return [...prev, product];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx === -1) return prev;
      const existing = prev[idx];
      if (existing.amount > 1) {
        const updated = [...prev];
        const newAmount = existing.amount - 1;
        const newTotal = Math.round(existing.price * newAmount * 100) / 100;
        updated[idx] = {
          ...existing,
          amount: newAmount,
          total: newTotal,
        };
        return updated;
      }
      
      return prev.filter((p) => p.id !== id);
    });
  };

  // wrappers that keep the original signature used in CartCards
  const handlerSetCart = (e, id, price, image, name, stock) => {
    e?.preventDefault?.();
    addItem({ id, price, image, name, stock });
  };

  const handleRemoveItemCart = (e, id) => {
    e?.preventDefault?.();
    removeItem(id);
  };

  const total = useMemo(() => {
    return cart.reduce(
      (acc, el) => acc + (el.total ?? el.price * el.amount),
      0
    );
  }, [cart]);

  console.log("TOTAL: ", total);

  // Checkout: now sends the full object expected by backend
  const handleCheckout = async () => {
    try {
      const payload = {
        cart,
        userInfo: loggedUser ?? null,
        currency_id: "ARS", // assumption: default currency
        shipping_cost: 0, // assumption: default 0 - change as needed
        metadata: {}, // assumption: empty metadata
      };

      const urlOrPref = await dispatch(createCheckout(payload));

      // depending on backend shape, this may be an object or string
      setPreferenceId(urlOrPref?.id ?? urlOrPref ?? null);
      setShowCheckout(true);
    } catch (err) {
      console.error("Error iniciando checkout:", err);
    }
  };

  const handleDialogCheckout = async () => {
    await handleCheckout();
    onClose();
  };

  return (
    <>
      <Box minHeight={"90vh"} bg="brand.backgorund" paddingBottom={"3rem"}>
        <Stack
          direction={{ base: "column", lg: "row" }}
          align={{ lg: "flex-start" }}
          spacing={{ base: "8", md: "16" }}
        >
          <Stack spacing={{ base: "8", md: "10" }} flex="2">
            {!cart || cart.length === 0 ? (
              <Center>
                <Stack>
                  <Text
                    textAlign={"center"}
                    fontSize={"4xl"}
                    py={10}
                    fontWeight={"bold"}
                    color={"brand.darkBlue"}
                    fontFamily={"heading"}
                  >
                    No hay productos en tu carrito
                  </Text>
                  <Link to={"/shop"}>
                    <Icon
                      as={MdArrowBackIosNew}
                      color="orange.400"
                      boxSize={5}
                    />
                    <Icon
                      as={MdArrowBackIosNew}
                      color="orange.400"
                      boxSize={5}
                    />
                    <Button
                      fontFamily={"body"}
                      bg="base.green.100"
                      color={"grey"}
                      _hover={{ color: "orange.400" }}
                      p="0"
                      mr="1rem"
                    >
                      Volver a la tienda
                    </Button>
                  </Link>
                </Stack>
              </Center>
            ) : (
              <Stack spacing="10">
                {cart.map((pr) => (
                  <CartCards
                    key={pr.id}
                    amount={pr.amount}
                    id={pr.id}
                    images={pr.images ?? pr.image}
                    name={pr.name}
                    price={pr.price}
                    total={pr.total}
                    stock={pr.stock}
                    handlerSetCart={handlerSetCart}
                    handleRemoveItemCart={handleRemoveItemCart}
                  />
                ))}

                <Center>
                  <SimpleGrid>
                    <Text
                      textAlign={"center"}
                      fontSize={"2xl"}
                      py={10}
                      fontWeight={"bold"}
                      color={"brand.orange"}
                      fontFamily={"heading"}
                    >
                      Total: $ {total}
                    </Text>

                    <Box>
                      <Button
                        onClick={onOpen}
                        fontFamily={"body"}
                        borderRadius={"full"}
                        size="lg"
                        bg={"brand.orange"}
                        color={"white"}
                        _hover={{
                          transform: "translateY(2px)",
                          boxShadow: "lg",
                        }}
                      >
                        Continuar compra
                      </Button>

                      <AlertDialog
                        isOpen={isOpen}
                        leastDestructiveRef={cancelRef}
                        onClose={onClose}
                      >
                        <AlertDialogOverlay>
                          <AlertDialogContent>
                            {isLogged ? (
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
                                El total actual del carrito es ${total}
                              </AlertDialogHeader>
                            ) : (
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
                                Necesitamos tus datos!
                              </AlertDialogHeader>
                            )}

                            {isLogged ? (
                              <AlertDialogBody>
                                Solo falta ir a pagar, si no necesitas nada más
                                haz click en "Ir a pagar"
                              </AlertDialogBody>
                            ) : (
                              <AlertDialogBody>
                                Para hacer la compra debes ingresar tu cuenta,
                                si no tienes puedes crear una!
                              </AlertDialogBody>
                            )}

                            {isLogged ? (
                              <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                  Volver al carrito
                                </Button>
                                <Button
                                  color={"white"}
                                  bg={{ base: "brand.orange" }}
                                  onClick={handleDialogCheckout}
                                  ml={3}
                                >
                                  Continuar compra
                                </Button>
                              </AlertDialogFooter>
                            ) : (
                              <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onClose}>
                                  Cancelar
                                </Button>
                                <Button
                                  color={"white"}
                                  bg={{ base: "brand.orange" }}
                                  onClick={(e) => {
                                    onClose();
                                    navigate("/");
                                  }}
                                  ml={3}
                                >
                                  Ingresar
                                </Button>
                              </AlertDialogFooter>
                            )}
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </Box>
                  </SimpleGrid>
                </Center>

                {!showCheckout ? (
                  <Box
                    minHeight={"90vh"}
                    bg="brand.backgorund"
                    paddingBottom={"3rem"}
                  >
                    {/* Placeholder area kept to preserve structure if you were rendering more of the cart UI here */}
                  </Box>
                ) : (
                  <PaymentCheckout preferenceId={preferenceId} amount={total} />
                )}

                <Link to={"/shop"}>
                  <Icon as={MdArrowBackIosNew} color="orange.400" boxSize={5} />
                  <Icon as={MdArrowBackIosNew} color="orange.400" boxSize={5} />
                  <Button
                    fontFamily={"body"}
                    bg="base.green.100"
                    color={"grey"}
                    _hover={{ color: "orange.400" }}
                    p="0"
                    mr="1rem"
                  >
                    Seguir comprando
                  </Button>
                </Link>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
