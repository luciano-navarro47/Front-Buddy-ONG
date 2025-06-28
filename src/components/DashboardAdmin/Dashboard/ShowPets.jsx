import React from "react";
import PetCard from "./Cards/PetCard";
import { SimpleGrid, Stack, Box, useBreakpointValue } from "@chakra-ui/react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ShowPets() {
  const pets = useSelector((state) => state.pets.allPets);
  useEffect(() => {}, [pets]);

  return (
    <Stack spacing="25px">
      <Box
        bg={"#bae8e8"}
        maxW="7xl"
        mx={"auto"}
        pt={2}
        px={{ base: 2, sm: 12, md: 17 }}
        borderRadius="20px"
        color={"blackAlpha.700"}
        fontWeight={700}
        alignItems={"center"}
        lineHeight={1.0}
        fontSize={useBreakpointValue({ base: "3xl", md: "4xl" })}
        textAlign={"center"}
        justifyContent={"center"}
      >
        Mascotas publicadas
      </Box>
      <SimpleGrid columns={[1, 1, 2, 3]} spacing="40px">
        {pets.length > 0 ? (
          pets.map((pet) => (
            <PetCard
              key={pet.id}
              img={pet.img}
              id={pet.id}
              size={pet.size}
              specie={pet.specie}
              age={pet.age}
              area={pet.area}
              status={pet.status}
              detail={pet.detail}
              userId={pet.userId}
            />
          ))
        ) : (
          <Box> No hay mascotas para mostrar. </Box>
        )}
      </SimpleGrid>
    </Stack>
  );
}
