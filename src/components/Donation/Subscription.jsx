import React, { useState } from "react";
import {
  Box,
  Button,
  chakra,
  Input,
  VStack,
  useToast,
  Text,
  Tag,
  Flex,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function Subscription() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const user = useSelector((s) => s.user);
  const [amount, setAmount] = useState(500);
  const [isLoading, setIsLoading] = useState(false);
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

    setIsLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/subscription`, {
        email: user.email,
        amount,
        currency_id: "ARS",
      });
      window.open(response.data, "_blank");
    } catch (error) {
      // console.log(error);
      toast({
        title: "Error al generar la suscripción",
        description: "Intentalo más tarde o contactanos.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Box
      bg="brand.background"
      paddingBottom={"3rem"}
      maxW="7xl"
      mx={"auto"}
      pt={10}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <VStack spacing={8}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          fontWeight={"bold"}
          color={"brand.darkBlue"}
          fontFamily={"heading"}
        >
          Suscripciones
        </chakra.h1>

        <Text color={"gray.500"} fontSize="1.5rem" pb={5} alignItems={"center"}>
          Podés ayudarnos de forma constante desde <b>$500</b> en adelante. Tu
          colaboración mensual nos permite seguir rescatando, cuidando y
          alimentando a cientos de animales que lo necesitan 💚.
        </Text>

        <VStack spacing={2} align="center">
          <Text mb={2} fontWeight="bold" fontSize="1.3rem" color="brand.orange">
            Elegí el monto que querés aportar mensualmente:
          </Text>

          <Flex>
            <Tag
              bg={"gray.200"}
              px={1}
              w={"60px"}
              borderRadius={0}
              border="1px solid #ccc"
              borderRight="none"
            >
            ARS $
            </Tag>
            <Input
              type="number"
              value={amount}
              min={500}
              onChange={handleChange}
              textAlign="left"
              borderColor="gray.300"
              borderRadius={0}
              _focus={{ borderColor: "brand.green" }}
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
            isLoading={isLoading}
            isDisabled={isLoading}
          >
            SUSCRIBITE
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
