import React, { useState, useEffect, useRef, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
// import { MdArrowBackIosNew } from "react-icons/md";
import {
  Box,
  // Icon,
  Text,
  Center,
  SimpleGrid,
  Stack,
  Button,
} from "@chakra-ui/react";
import {
  AlertDialog,
  AlertDialogBody,
  // AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import CartCards from "./CartCards";
import PaymentCheckout from "../PaymentCheckout";
import { createCheckout } from "redux/Actions/paymentsActions";

export default function Cart() {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const cancelRef = useRef();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const readInitialCart = () => {
    try {
      const raw = window.localStorage.getItem("cart");
      if (!raw) return [];
      const parsed = JSON.parse(raw);

      const normalize = (p) => {
        const unit_price = Number(p.unit_price ?? p.price ?? 0);
        const quantity = Number(p.quantity ?? p.amount ?? 0);
        const stock = Number(p.stock ?? 0);
        const img =
          (Array.isArray(p.images) && p.images.length > 0 && p.images[0]) ||
          p.picture_url ||
          undefined;

        const computedTotal = Number.isFinite(Number(p.total))
          ? Number(p.total)
          : unit_price * quantity;

        const total = Number.isFinite(computedTotal)
          ? Math.round(computedTotal * 100) / 100
          : 0;

        return {
          id: String(p.id),
          name: String(p.name ?? ""),
          unit_price: Number.isFinite(unit_price) ? unit_price : 0,
          quantity: Number.isFinite(quantity) ? quantity : 0,
          stock,
          picture_url: img,
          total,
        };
      };
      const initial = Array.isArray(parsed) ? parsed.map(normalize) : [];
      try {
        window.localStorage.setItem("cart", JSON.stringify(initial));
      } catch (err) {}
      return initial;
    } catch (err) {
      console.error("Error parsing cart from localStorage:", err);
      return [];
    }
  };

  const [cart, setCart] = useState(readInitialCart);
  const [showCheckout, setShowCheckout] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const loggedUser = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("loggedUser"));
    } catch (err) {
      return null;
    }
  }, []);

  const isLogged = Boolean(loggedUser);
  useEffect(() => {
    try {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    } catch (err) {
      console.error("Error saving cart to localStorage:", err);
    }
  }, [cart]);

  const addItem = ({ id, name, image, price, stock }) => {
    const unit_price = Number(price || 0);
    const stockNum = Number(stock ?? 0);
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx !== -1) {
        const existing = prev[idx];
        if (existing.quantity >= (existing.stock ?? stockNum)) {
          alert("Se llegó al limite de stock actual");
          return prev;
        }
        const updated = [...prev];
        const newQuantity = existing.quantity + 1;
        const newTotal = Math.round(unit_price * newQuantity * 100) / 100;
        updated[idx] = {
          ...existing,
          quantity: newQuantity,
          total: newTotal,
        };
        return updated;
      }

      const product = {
        id: String(id),
        name: String(name ?? ""),
        unit_price,
        quantity: 1,
        stock: stockNum,
        picture_url: Array.isArray(image) ? image[0] : image,
        image: Array.isArray(image) ? image[0] : image,
        total: Math.round(unit_price * 100) / 100,
      };
      return [...prev, product];
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      if (idx === -1) return prev;
      const existing = prev[idx];
      if (existing.quantity > 1) {
        const updated = [...prev];
        const newQuantity = existing.quantity - 1;
        const newTotal =
          Math.round(existing.unit_price * newQuantity * 100) / 100;
        updated[idx] = {
          ...existing,
          quantity: newQuantity,
          total: newTotal,
        };
        return updated;
      }
      return prev.filter((p) => p.id !== id);
    });
  };

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

  const handleCheckout = async (mode = "brick") => {
    try {
      setLoadingCheckout(true);

      const transformedCart = cart.map((p) => ({
        id: String(p.id),
        name: String(p.name ?? ""),
        unit_price: Number(p.unit_price ?? p.price ?? 0),
        quantity: Number(p.quantity ?? p.amount ?? 1),
        image:
          (Array.isArray(p.images) && p.images[0]) ||
          p.image ||
          p.picture_url ||
          undefined,
      }));

      const userInfo = loggedUser
        ? {
            id: loggedUser.id,
            fullName: loggedUser.fullName,
            email: loggedUser.email,
          }
        : null;

      const payload = {
        cart: transformedCart,
        userInfo,
        currency_id: "ARS",
        shipping_cost: 0,
        metadata: {},
      };

      const data = await dispatch(createCheckout(payload));

      if (mode === "redirect") {
        if (data?.init_point) {
          window.location.href = data.init_point;
          return;
        } else {
          throw new Error("No init_point returned from server");
        }
      }

      // modo brick
      if (mode === "brick") {
        if (data?.preference_id) {
          setPreferenceId(data.preference_id);
          setShowCheckout(true);

          setTimeout(() => {
            window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
          }, 120);
          
          return;
        } else {
          throw new Error("No preference_id returned from server");
        }
      }
    } catch (err) {
      console.error("Error iniciando checkout:", err);
      // opcional: mostrar toast/alert
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent={"center"}
        pt={2}
        bg={"brand.green.200"}
      >
        <Link to={"/shop"}>
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
      </Box>
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
                </Stack>
              </Center>
            ) : (
              <Stack spacing="10">
                {cart.map((pr) => (
                  <CartCards
                    key={pr.id}
                    amount={pr.quantity}
                    id={pr.id}
                    picture_url={pr.picture_url}
                    name={pr.name}
                    price={pr.unit_price}
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
                        onClick={() => handleCheckout("brick")}
                        fontFamily={"body"}
                        borderRadius={"full"}
                        size="lg"
                        bg={"brand.orange"}
                        color={"white"}
                        _hover={{
                          transform: "translateY(2px)",
                          boxShadow: "lg",
                        }}
                        isDisabled={showCheckout || loadingCheckout}
                        isLoading={loadingCheckout}
                      >
                        Continuar
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
                                puedes continuar tu compra.
                              </AlertDialogBody>
                            ) : (
                              <AlertDialogBody>
                                Para hacer la compra debes ingresar tu cuenta,
                                si no tienes puedes crear una!
                              </AlertDialogBody>
                            )}
                          </AlertDialogContent>
                        </AlertDialogOverlay>
                      </AlertDialog>
                    </Box>
                  </SimpleGrid>
                </Center>

                {!showCheckout ? (
                  ""
                ) : (
                  <PaymentCheckout preferenceId={preferenceId} amount={total} />
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
