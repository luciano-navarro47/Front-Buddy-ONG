import React from "react";
import { VStack } from "@chakra-ui/react";
import CartItem from "./CartItem";

export default function CartList({ items, onIncrease, onDecrease }) {
  return (
    <VStack spacing={6} align="stretch">
      {items.map((it) => (
        <CartItem
          key={it.id}
          item={it}
          onIncrease={() => onIncrease(it.id)}
          onDecrease={() => onDecrease(it.id)}
        />
      ))}
    </VStack>
  );
}
