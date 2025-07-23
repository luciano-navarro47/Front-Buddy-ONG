import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Heading, Text, Box, SimpleGrid } from "@chakra-ui/react";
import { getPetsByUser } from "redux/Actions/petActions";
import Pagination from "components/Pagination/Pagination";
import PetCard from "./PetCard";
import { useSearchParams } from "react-router-dom";

export default function MyPetsList({ user }) {
  const dispatch = useDispatch();
  const userPets = useSelector((state) => state.pets.userPets) || [];

  // Use query-params ?page= to remember the page
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);
  const petsPerPage = 4;

  // Calculate index per page
  const indexOfLast = currentPage * petsPerPage;
  const indexOfFirst = indexOfLast - petsPerPage;
  const currentPets = userPets.slice(indexOfFirst, indexOfLast);

  // Fn to change page
  const paginate = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > Math.ceil(userPets.length / petsPerPage))
      return;
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getPetsByUser(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  return (
    <Box>
      <Box bg="brand.green.100" p="4" borderRadius="md" mb="6">
        <Heading size="lg">Mis mascotas</Heading>
        <Text mt="2" color="gray.700">
          Editá la información o dejá de publicar tus animales
          posteados.
        </Text>
      </Box>

      {userPets.length > 0 ? (
        <Box maxW="1200px" mx="auto" px="4">
          <SimpleGrid
            minChildWidth="250px"
            spacing="20px"
            justifyContent="center"
            alignItems="start"
          >
            {currentPets.map((pet) => (
              <PetCard key={pet.id} data={pet} user={user} currentPage={currentPage} />
            ))}
          </SimpleGrid>

          <Pagination
            petsPerPage={petsPerPage}
            totalPets={userPets.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </Box>
      ) : (
        <Text fontSize="x1" textAlign="center" color="gray.600">
          No tenés mascotas publicadas
        </Text>
      )}
    </Box>
  );
}
