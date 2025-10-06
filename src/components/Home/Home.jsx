import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { MdOutlinePets } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
const Home = ({ user, setUser, isAuthenticated, handleLogout }) => {
  console.log("user", user);
  const navigate = useNavigate();

  useEffect(() => {
    const safeuser =
      user && Object.keys(user).length > 0 ? user : { status: "guest" };
    if (safeuser.status === "banned") {
      navigate("/banned");
    }
  }, [user, navigate]);

  function StatsCard({ icon, title, stat }) {
    return (
      <Stat
        px={{ base: 2, md: 4 }}
        py={"5"}
        shadow={"xl"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.800", "gray.500")}
        rounded={"lg"}
      >
        <Flex justifyContent={"space-between"}>
          <Box pl={{ base: 2, md: 4 }}>
            <StatLabel fontWeight={"medium"} isTruncated>
              {title}
            </StatLabel>
            <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
              {stat}
            </StatNumber>
          </Box>
          <Box
            my={"auto"}
            color={useColorModeValue("gray.800", "gray.200")}
            alignContent={"center"}
          >
            {icon}
          </Box>
        </Flex>
      </Stat>
    );
  }

  return (
    <>
      <Box minHeight={"100vh"} bg="brand.backgorund" paddingBottom={"3rem"}>
        <Flex
          w={"full"}
          h={"90vh"}
          backgroundImage={
            "url(https://www.hogarmania.com/archivos/201712/mascotas-perros-perdidos-1280x720x80xX.jpg)"
          }
          backgroundSize={"cover"}
          backgroundPosition={"center center"}
        >
          <VStack
            w={"full"}
            alignItems={"left"}
            justify={"center"}
            px={useBreakpointValue({ base: 4, md: 150 })}
            bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
          >
            <Stack maxW={"2xl"} align={"flex-left"} spacing={6}>
              <Text
                color={"white"}
                fontWeight={700}
                lineHeight={1.2}
                fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
                textAlign={"left"}
                justifyContent={"left"}
              >
                Abocados a difundir, proteger y promover los derechos de los
                animales.
              </Text>
              <Stack direction={"row"}>
                <Button
                  bg={"brand.orange"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "brand.darkBlue" }}
                  fontFamily={"body"}
                >
                  <NavLink to="/aboutUs">Conoce sobre nosotros!</NavLink>
                </Button>
                <Button
                  bg={"whiteAlpha.300"}
                  rounded={"full"}
                  color={"white"}
                  _hover={{ bg: "whiteAlpha.500" }}
                >
                  <NavLink to="/adoptions">Salva Vidas</NavLink>
                </Button>
              </Stack>
            </Stack>
          </VStack>
        </Flex>
        <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
          <chakra.h1
            textAlign={"center"}
            fontSize={"4xl"}
            py={10}
            fontWeight={"bold"}
            color={"brand.darkBlue"}
          >
            Cada vez somos más grandes, vos podes formar parte!
          </chakra.h1>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            <StatsCard
              title={"Donantes"}
              stat={"+5,000"}
              icon={<BsPerson size={"3em"} />}
            />
            <StatsCard
              title={"Animales Rescatados"}
              stat={"1,000"}
              icon={<MdOutlinePets size={"3em"} />}
            />
            <StatsCard
              title={"Veterinarias amigas"}
              stat={"7"}
              icon={<GoLocation size={"3em"} />}
            />
          </SimpleGrid>
        </Box>
        <Box maxW="7xl" mx={"auto"} pt={20} px={{ base: 2, sm: 12, md: 17 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box
              h={"80"}
              backgroundImage={
                "url(https://apadrinaunperro.org/wp-content/uploads/2022/02/perros-en-adopcion-pequenos.jpg)"
              }
              backgroundSize={"cover"}
              backgroundPosition={"center center"}
              borderRadius={20}
              boxShadow="2xl"
            />
            <Box alignItems="left" py={20}>
              <chakra.h4
                textAlign={"left"}
                fontSize={"2xl"}
                py={3}
                fontWeight={"bold"}
                color={"brand.orange"}
                fontFamily={"heading"}
              >
                Adopta tu mascota / Pone en adopción
              </chakra.h4>
              <NavLink to="/adoptions">
                <Text
                  mt={1}
                  textAlign={"left"}
                  display="block"
                  fontSize="lg"
                  lineHeight="normal"
                  fontWeight="semibold"
                  fontFamily={"body"}
                >
                  Encontra más infromación sobre las mascotas en adopción
                </Text>
              </NavLink>
              <Text mt={2} color="gray.500" textAlign={"left"}>
                Nuestra comunidad busca alcanzar a las mascotas a su nuevo
                hogar. Enterate de más en nuestro feed de animales en adopción!
              </Text>
            </Box>
          </SimpleGrid>
        </Box>
        <Box maxW="7xl" mx={"auto"} pt={20} px={{ base: 2, sm: 12, md: 17 }}>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
            <Box alignItems="right" py={20}>
              <chakra.h4
                textAlign={"right"}
                fontSize={"2xl"}
                fontFamily={"heading"}
                py={3}
                fontWeight={"bold"}
                color={"brand.orange"}
              >
                Animales perdidos
              </chakra.h4>
              <NavLink to="/lostPets">
                <Text
                  textAlign={"right"}
                  mt={1}
                  display="block"
                  fontSize="lg"
                  lineHeight="normal"
                  fontWeight="semibold"
                  fontFamily={"body"}
                >
                  Encontra más información sobre los animales perdidos
                </Text>
              </NavLink>
              <Text
                mt={2}
                color="gray.500"
                textAlign={"right"}
                fontFamily={"body"}
              >
                Queremos ayudarte a encontrar a tu mascota, facilitamos la
                busqueda por zonas, edad, tamaño, etc. Tendrás formas de
                contactarte vía WhatsApp!
              </Text>
            </Box>
            <Box
              h={"80"}
              backgroundImage={
                "url(https://www.catit.com/wp-content/uploads/2021/10/Why-does-my-cat-need-a-collar.jpg)"
              }
              backgroundSize={"cover"}
              backgroundPosition={"center center"}
              borderRadius={20}
              boxShadow="2xl"
              alignItems={"right"}
            />
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
};
export default Home;
