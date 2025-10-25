import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Text, Box, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { getPetsByUser } from "redux/Actions/petActions";
import PetCard from "./PetCard";
import Pagination from "components/commons/pagination/Pagination";
import SectionHeader from "../common/SectionHeader";
import ActionPill from "../common/buttons/ActionPill";
import PetForm from "./form/FormFields/PetForm";
import ReusableFormModal from "../common/ReusableFormModal";

export default function MyPetsList({ user }) {
  const dispatch = useDispatch();
  const userRole = user.role;
  const userPets = useSelector((state) => state.pets.userPets) || [];
  const [formMode, setFormMode] = useState("create");
  const {
    isOpen: isFormOpen,
    onOpen: onOpenForm,
    onClose: onCloseForm,
  } = useDisclosure();

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

  const handleSuccess = useCallback(() => {
    dispatch(getPetsByUser());
    onCloseForm();
  }, [dispatch, onCloseForm]);

  useEffect(() => {
    dispatch(getPetsByUser(user.id));
  }, [dispatch, user.id]);

  useEffect(() => {
    setSearchParams({ page: currentPage });
  }, [currentPage, setSearchParams]);

  // TO DO: show a SuccessAlertNotification when a pet is published correctly

  return (
    <Box>
      <SectionHeader
        title="Mis mascotas"
        subtitle="Editá la información de tus animales
          posteados o dejá de publicarlos."
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        pb={2}
      >
        <ActionPill
          icon={<AddIcon boxSize={4} ml={0.5} color="blackAlpha.600" />}
          onClick={() => {
            // dispatch(clearProduct());
            // setSelectedProductId(null);
            setFormMode("create");
            onOpenForm();
          }}
        ></ActionPill>
      </Box>

      <ReusableFormModal
        isOpen={isFormOpen}
        onClose={onCloseForm}
        formMode={formMode}
        header={
          formMode === "create" ? "Publicar mascota" : "Editar mascota"
        }
      >
        <PetForm
          mode={formMode}
          onSuccess={handleSuccess}
          onCancel={onCloseForm}
          userRole={userRole}
        />
      </ReusableFormModal>

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
            itemsPerPage={petsPerPage}
            totalItems={userPets.length}
            currentPage={currentPage}
            onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
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
