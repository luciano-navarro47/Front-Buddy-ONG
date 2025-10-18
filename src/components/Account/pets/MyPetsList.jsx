import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Text, Box, SimpleGrid } from "@chakra-ui/react";
import { getPetsByUser } from "redux/Actions/petActions";
import PetCard from "./PetCard";
import Pagination from "components/Pagination/Pagination";
import SectionHeader from "../common/SectionHeader";

export default function MyPetsList({ user }) {
  const dispatch = useDispatch();
  const userPets = useSelector((state) => state.pets.userPets) || [];

  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageParam);
  const petsPerPage = 4;

  const indexOfLast = currentPage * petsPerPage;
  const indexOfFirst = indexOfLast - petsPerPage;
  const currentPets = userPets.slice(indexOfFirst, indexOfLast);

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
      <SectionHeader
        title="Mis mascotas"
        subtitle="Editá la información de tus animales
          posteados o dejá de publicarlos."
      />

      {userPets.length > 0 ? (
        <Box maxW="1200px" mx="auto" px="4">
          <SimpleGrid
            minChildWidth="250px"
            spacing="20px"
            justifyContent="center"
            alignItems="start"
          >
            {currentPets.map((pet) => (
              <PetCard
                key={pet.id}
                data={pet}
                user={user}
                currentPage={currentPage}
              />
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
