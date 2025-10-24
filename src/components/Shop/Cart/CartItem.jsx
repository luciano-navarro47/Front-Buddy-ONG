import React from "react";
import { Box, Image, Text, HStack, VStack, Button } from "@chakra-ui/react";

export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <Box
      bg="white"
      borderRadius="md"
      boxShadow="md"
      p={4}
      w="100%"
    >
      <HStack align="center" spacing={6}>
        <Image
          src={item.picture_url}
          boxSize="80px"
          objectFit="cover"
          borderRadius="md"
          alt={item.name}
        />
        <VStack align="start" spacing={1} flex="1">
          <Text fontWeight="600" fontSize="sm">{item.name}</Text>
          <Text fontSize="sm">Precio: ${item.unit_price}</Text>
          <Text fontSize="sm">Cantidad: {item.quantity}</Text>
        </VStack>

        <VStack spacing={2} align="end">
          <HStack>
            <Button size="sm" onClick={() => onDecrease(item.id)}>-</Button>
            <Button size="sm" onClick={() => onIncrease(item.id)}>+</Button>
          </HStack>
          <Text fontSize="sm">Subtotal: ${item.total}</Text>
        </VStack>
      </HStack>
    </Box>
  );
}
