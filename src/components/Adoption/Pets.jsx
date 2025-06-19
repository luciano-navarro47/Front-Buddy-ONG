import { Link } from "react-router-dom";
import { SiDatadog } from "react-icons/si";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SimpleGrid, Box, Stack, Center, Icon, Text } from "@chakra-ui/react";

import Card from "../Card/Card";
import FilterBar from "./FilterBar";
import Pagination from "../Pagination/Pagination";
import { getPets } from "../../redux/Actions/petActions";

const Adoption = ({ value }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [petsPerPage, setPetsPerPage] = useState(3);

  const pets = useSelector((state) => state.root.pets);
  const indexOfLastPet = currentPage * petsPerPage;
  const indexOfFirstPet = indexOfLastPet - petsPerPage;
  const currentPets = pets.slice(indexOfFirstPet, indexOfLastPet);

  const paginate = (number) => {
    setCurrentPage(number);
  };

  useEffect(() => {
    if (pets.length === 0) {
      dispatch(getPets(value));
      setCurrentPage(1);
    }
  }, [dispatch, value]);

  return (
    <>
      <FilterBar value={value} paginate={paginate} />

      <Box my="1rem">
        <Pagination
          paginate={paginate}
          petsPerPage={petsPerPage}
          allPets={pets.length}
          currentPage={currentPage}
        />
      </Box>
      <Center>
        <SimpleGrid columns={[1, 1, 2, 3]} spacing={10}>
          {pets.length === 0 ? (
            <Center>
              <Stack direction="row">
                <Box bg="purple.100">
                  <Text px="4rem" fontFamily={"body"}>
                    No hay mascotas en tu área
                  </Text>
                  <Icon boxSize={120} w="100px" as={SiDatadog}></Icon>
                </Box>
              </Stack>
            </Center>
          ) : (
            currentPets?.map((el) => (
              <Link to={`/pet/${el?.id}`} key={el?.id}>
                <Card data={el} />
              </Link>
            ))
          )}
        </SimpleGrid>
      </Center>
    </>
  );
};

export default Adoption;
