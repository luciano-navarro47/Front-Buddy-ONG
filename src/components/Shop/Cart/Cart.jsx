import React, { useState, useEffect, useMemo, useRef } from "react";
import { Box, SimpleGrid, Center } from "@chakra-ui/react";
import { readInitialCart } from "utils/shop/cart/cart";
import CartList from "./CartList";
import CartSummary from "./CartSummary";
import PaymentCheckout from "../PaymentCheckout";
import { useDispatch } from "react-redux";
import { createCheckout } from "redux/Actions/paymentsActions";

export default function Cart() {
  const dispatch = useDispatch();
  const [cart, setCart] = useState(readInitialCart);
  const [loadingCheckout, setLoadingCheckout] = useState(false);
  const [showBrick, setShowBrick] = useState(false);
  const [preferenceId, setPreferenceId] = useState(null);
  const brickRef = useRef(null);

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
        if (p.quantity <= 1) return []; // remove
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

  const handleContinue = async () => {
    setLoadingCheckout(true);
    try {
      const transformed = cart.map((p) => ({
        id: p.id,
        name: p.name,
        unit_price: p.unit_price,
        quantity: p.quantity,
        image: p.picture_url,
      }));

      const payload = {
        cart: transformed,
        userInfo: JSON.parse(localStorage.getItem("loggedUser")) || null,
        currency_id: "ARS",
        shipping_cost: 0,
        metadata: {},
      };

      const data = await dispatch(createCheckout(payload));

      if (data?.preference_id) {
        setPreferenceId(data.preference_id);
        setShowBrick(true);
        setTimeout(() => {
          brickRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 160);
      } else if (data?.init_point) {
        window.location.href = data.init_point;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <Box minH="80vh" pb={12}>
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
            disabled={cart.length === 0}
          />
        </Box>
      </SimpleGrid>

      <Box ref={brickRef} mt={8} px={{ base: 4, md: 12 }}>
        {showBrick && (
          <PaymentCheckout preferenceId={preferenceId} amount={total} />
        )}
      </Box>
    </Box>
  );
}
