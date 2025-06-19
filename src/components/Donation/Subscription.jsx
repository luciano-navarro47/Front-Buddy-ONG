import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  VStack,
  useToast,
  Text,
  Tag,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

export const Subscription = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const user = useSelector((s) => s.user);
  const [amount, setAmount] = useState(500);
  const toast = useToast();

  const handleChange = (e) => {
    const value = parseInt(e.target.value);

    if (!value) {
      setAmount("");
      return;
    }

    if (!isNaN(value)) {
      setAmount(value);
    }
  };

  const handleSubmit = async () => {
    if (!user || !user.email) {
      return toast({
        title: "Necesitas iniciar sesión",
        description:
          "Por favor iniciá sesión para poder suscribirte y ayudarnos mensualmente",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    if (!amount || isNaN(amount) || amount < 500) {
      return toast({
        title: "Monto inválido",
        description: "El monto mínimo para suscribirte es de $500.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
    try {
      const response = await axios.post(`${apiUrl}/subscription`, {
        email: user.email,
        amount,
        currency_id: "ARS",
      });
      window.open(response.data, "_blank");
    } catch (error) {
      console.log(error);
      toast({
        title: "Error al generar la suscripción",
        description: "Intentalo más tarde o contactanos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <VStack spacing={8}>
        <Heading textAlign="center" marginTop={"20px"} color="brand.darkBlue">
          Suscripciones
        </Heading>

        <Text fontSize="xl" color="gray.500">
          Podés ayudarnos de forma constante desde <b>$500</b> en adelante. Tu
          colaboración mensual nos permite seguir rescatando, cuidando y
          alimentando a cientos de animales que lo necesitan 💚.
        </Text>

        <VStack spacing={2} align="center">
          <Text mb={2} fontWeight="bold" color="brand.orange">
            Elegí el monto que querés aportar mensualmente:
          </Text>

          <Flex>
            <Tag
              bg={"gray.200"}
              px={2}
              borderRadius={0}
              border="1px solid #ccc"
              borderRight="none"
            >
              $
            </Tag>
            <Input
              type="number"
              value={amount}
              min={500}
              onChange={handleChange}
              textAlign="center"
              borderColor="gray.300"
              _focus={{ borderColor: "brand.orange" }}
              fontFamily="body"
              fontWeight="bold"
            />
          </Flex>
        </VStack>

        <Box>
          <Button
            bg={"brand.darkBlue"}
            rounded={"full"}
            color={"white"}
            _hover={{ bg: "brand.orange" }}
            fontFamily={"body"}
            onClick={handleSubmit}
            size={"lg"}
          >
            Suscribite
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};
