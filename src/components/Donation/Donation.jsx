import React from "react";
import { useSelector } from "react-redux";
import mercadoPago from "../../assets/imagenes/mercadoPago.png";

import {
  Box,
  Button,
  Text,
  chakra,
  SimpleGrid,
  Image,
  Center,
} from "@chakra-ui/react";

import axios from "axios";
import { Subscription } from "./Subscription";

const Donation = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const user = useSelector((state) => state.user);
  const handlePayment = async (value) => {
    const donation = {
      unit_price: parseInt(value),
      title: "Gracias por su colaboración",
    };
    try {
      const response = await axios.post(`${apiUrl}/donation`, { donation });
      window.open(response.data, "_blank");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box minHeight={"100vh"} bg="brand.background" paddingBottom={"3rem"}>
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
            color={"brand.darkBlue"}
            fontFamily={"heading"}
          >
            ¡Ayudanos con tu donación y forma parte!
          </chakra.h1>
          <Box
            h={"80"}
            backgroundImage={
              "url(https://www.comunidad.madrid/sites/default/files/styles/image_style_16_9/public/img/dog-1861839_1920_1.jpg?itok=QNNPiHxj)"
            }
            backgroundSize={"cover"}
            backgroundPosition={"center center"}
            borderRadius={20}
            boxShadow="2xl"
          />
          <Text
            color={"gray.500"}
            fontSize="xl"
            py={8}
            pb={8}
            alignItems={"center"}
          >
            Tu aporte único o mensual nos permite seguir llevando a cabo
            actividades sanitarias, educativas y de asistencialismo. Los aportes
            económicos son importantes para pagar tratamientos, estudios médicos
            y honorarios veterinarios, comprar insumos y alimento, financiar
            campañas de castración en zonas carenciadas, imprimir material de
            difusión entre otros.
          </Text>
          <Center>
            {" "}
            <Image src={mercadoPago} />
          </Center>

          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
            color={"brand.darkBlue"}
            fontFamily={"heading"}
          >
            Aporte único
          </chakra.h1>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            {[500, 1000, 2000].map((value) => (
              <Button
                key={value}
                bg={"brand.orange"}
                rounded={"full"}
                color={"white"}
                _hover={{ bg: "brand.darkBlue" }}
                fontFamily={"body"}
                onClick={() => handlePayment(value)}
              >
                ${value}
              </Button>
            ))}
          </SimpleGrid>
          <Subscription />
        </Box>
      </Box>
    </>
  );
};

export default Donation;
