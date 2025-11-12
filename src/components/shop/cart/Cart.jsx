import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useLayoutEffect,
} from "react";
import {
  Box,
  SimpleGrid,
  Button,
  HStack,
  VStack,
  Spinner,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { readInitialCart } from "utils/shop/cart/cart";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import PaymentCheckout from "./PaymentCheckout";
import { useDispatch } from "react-redux";
import { createCheckout } from "redux/actions/paymentsActions";
import { useSearchParams, useNavigate } from "react-router-dom";
import { normalizeUserInfo } from "utils/normalizeUserInfo";

export default function Cart() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(readInitialCart);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  const [showBrick, setShowBrick] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const [lastPayloadHash, setLastPayloadHash] = useState(null);

  const brickRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  const increase = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              quantity: p.quantity + 1,
              total: Math.round(p.unit_price * (p.quantity + 1) * 100) / 100,
            }
          : p
      )
    );
  };

  const decrease = (id) => {
    setCart((prev) =>
      prev.flatMap((p) => {
        if (p.id !== id) return p;
        if (p.quantity <= 1) return [];
        const q = p.quantity - 1;
        return {
          ...p,
          quantity: q,
          total: Math.round(p.unit_price * q * 100) / 100,
        };
      })
    );
  };

  const total = useMemo(
    () => cart.reduce((acc, it) => acc + (it.total || 0), 0),
    [cart]
  );

  const currentTransformed = useMemo(
    () =>
      cart.map((p) => ({
        id: p.id,
        name: p.name,
        unit_price: p.unit_price,
        quantity: p.quantity,
        image: p.picture_url,
      })),
    [cart]
  );

  const currentPayloadHash = useMemo(() => {
    try {
      return JSON.stringify(currentTransformed);
    } catch (e) {
      return null;
    }
  }, [currentTransformed]);

  useEffect(() => {
    if (!showBrick) return;
    if (
      lastPayloadHash &&
      currentPayloadHash &&
      lastPayloadHash !== currentPayloadHash
    ) {
      setShowBrick(false);
      setPreferenceId(null);
    }
  }, [cart, showBrick, lastPayloadHash, currentPayloadHash]);

  const handleContinue = async () => {
    if (loadingCheckout) return;

    const rawUser = JSON.parse(localStorage.getItem("loggedUser")) || null
    const userInfo = normalizeUserInfo(rawUser)

    const payload = {
      cart: currentTransformed,
      userInfo,
      currency_id: "ARS",
      shipping_cost: 0,
      metadata: {},
    };

    const payloadHash = currentPayloadHash;

    if (preferenceId && showBrick && lastPayloadHash === payloadHash) {
      brickRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    setLoadingCheckout(true);
    try {
      const data = await dispatch(createCheckout(payload));

      if (data?.preference_id) {
        setPreferenceId(data.preference_id);
        setLastPayloadHash(payloadHash);

        setShowBrick(false);
        setTimeout(() => setShowBrick(true), 50);
      } else if (data?.init_point) {
        window.location.href = data.init_point;
      }
    } catch (err) {
      // console.error("Error en createCheckout:", err);
    } finally {
      setLoadingCheckout(false);
    }
  };

  // Auto-scroll to brick
  useLayoutEffect(() => {
    if (showBrick && preferenceId && brickRef.current) {
      brickRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showBrick, preferenceId]);

  const handleBackToShop = () => {
    const query = searchParams.toString();
    navigate(`/shop${query ? `?${query}` : ""}`);
  };

  return (
    <Box minH="80vh" pb={12}>
      <HStack px={{ base: 4, md: 12 }} pt={6} spacing={4} align="center">
        <Button
          leftIcon={<ArrowBackIcon />}
          variant="ghost"
          onClick={handleBackToShop}
        >
          Volver a la tienda
        </Button>
      </HStack>

      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={6}
        px={{ base: 4, md: 12 }}
        py={8}
      >
        <Box gridColumn={{ md: "1 / span 2" }}>
          <CartList items={cart} onIncrease={increase} onDecrease={decrease} />
        </Box>

        <Box>
          <CartSummary
            total={total}
            onContinue={handleContinue}
            loading={loadingCheckout}
            disabled={cart.length === 0 || (showBrick && preferenceId)}
          />
        </Box>
      </SimpleGrid>

      <Box mt={4} px={{ base: 4, md: 12 }}>
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing={6}
          width="100%"
          alignItems="start"
        >
          <Box gridColumn={{ md: "1 / span 2" }} px={0}>
            <VStack spacing={4} align="stretch">
              <Box px={0} pt={0} width="100%">
                {loadingCheckout && (
                  <Box textAlign="center" py={6}>
                    <Spinner size="xl" />
                  </Box>
                )}
                {showBrick && preferenceId && !loadingCheckout && (
                  <div ref={brickRef}>
                    <PaymentCheckout
                      key={`${preferenceId}-${lastPayloadHash ?? ""}`}
                      preferenceId={preferenceId}
                      amount={total}
                      loadingCheckout={loadingCheckout}
                    />
                  </div>
                )}
              </Box>
            </VStack>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
