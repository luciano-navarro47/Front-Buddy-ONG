import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Text, Box, SimpleGrid } from "@chakra-ui/react";
import PetCard from "./PetCard";
import { getPetsByUser } from "redux/Actions/petActions";

export default function MyPetsList({ user, setUser }) {
  const dispatch = useDispatch();
  const userPets = useSelector((state) => state.pets.userPets) || [];

  useEffect(() => {
    dispatch(getPetsByUser(user.id));
  }, [dispatch, user.id]);

  return (
    <Box>
      <Box bg="brand.green.200" p="4" borderRadius="md" mb="6">
        <Heading size="lg">Mis mascotas</Heading>
        <Text mt="2" color="gray.700">
          Podes editar la información o dejar de publicar tus animales
          posteados.
        </Text>
      </Box>

      {userPets.length > 0 ? (
        <SimpleGrid minChildWidth="300px" spacingX="90px" spacingY="40px">
          {userPets.map((pet, idx) => (
            <PetCard key={idx} data={pet} value={"update"} />
          ))}
        </SimpleGrid>
      ) : (
        <Text fontSize="x1" textAlign="center" color="gray.600">
          No tenés mascotas publicadas
        </Text>
      )}
    </Box>
  );
}
