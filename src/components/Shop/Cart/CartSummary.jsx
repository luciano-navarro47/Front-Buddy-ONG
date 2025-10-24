import React from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";

export default function CartSummary({
  total,
  onContinue,
  loading,
  disabled,
}) {
  return (
    <Box
      p={4}
      bg="white"
      borderRadius="md"
      boxShadow="md"
      w={{ base: "100%", md: "320px" }}
      position={{ md: "sticky" }}
      top="80px"
    >
      <VStack spacing={4}>
        <Text fontSize="lg" fontWeight="600">Total: ${total}</Text>
        <Button
          colorScheme="orange"
          width="100%"
          onClick={onContinue}
          isLoading={loading}
          isDisabled={disabled}
        >
          Continuar
        </Button>
      </VStack>
    </Box>
  );
}
