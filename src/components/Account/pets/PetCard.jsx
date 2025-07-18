import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./PetCard.css";
import {
  Heading,
  Image,
  Box,
  Text,
  Stack,
  Button,
  Link,
  Badge,
  Icon,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { MdPlace } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { deletePet } from "redux/Actions/petActions";

const PetCard = ({
  data: { id, size, img, sex, specie, age, area },
  value,
}) => {
  const dispatch = useDispatch();
  const [usuario, setUsuario] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const navigate = useNavigate();
  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const logged = JSON.parse(loggedUser);
      setUsuario(logged);
    }
  }, []);
  function handlerNavigateUpdate(e) {
    e.preventDefault();
    navigate(`/updatePet/${id}`);
  }

  function handlerDeletePet(e, id) {
    e.preventDefault();
    dispatch(deletePet(id, usuario[0]?.id));
  }

  return (
    <Box
      w="300px"
      h="430px"
      mr="1rem"
      mb="1rem"
      bg="#fff"
      boxShadow="0 0 1rem .4rem rgb(0,0,0,0.35)"
      borderRadius=".4rem"
    >
      {value === "update" ? (
        <Box
          w="300px"
          h="3rem"
          position="absolute"
          zIndex="1"
          display="flex"
          alignItems="center"
        >
          <Button
            position="absolute"
            right={"0"}
            marginRight={".5rem"}
            fontFamily={"body"}
            w="2.5rem"
            h="2rem"
            bg={"orange.300"}
            color={"white"}
            _hover={{
              bg: "orange.400",
              top: ".4rem",
            }}
            onClick={onOpen}
          >
            X
          </Button>
          <AlertDialog
            isOpen={isOpen}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
          >
            <AlertDialogOverlay>
              <AlertDialogContent>
                <AlertDialogHeader fontSize="lg" fontWeight="bold">
                  Borrar Mascota
                </AlertDialogHeader>
                <AlertDialogBody>
                  ¿Estás seguro/a de querer borrar tu mascota? No podras volver
                  atras una vez hecho.
                </AlertDialogBody>
                <AlertDialogFooter>
                  <Button ref={cancelRef} onClick={onClose}>
                    Cancelar
                  </Button>
                  <Button
                    colorScheme="red"
                    onClick={(e) => {
                      handlerDeletePet(e, id);
                      onClose();
                    }}
                    ml={3}
                  >
                    Borrar
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
        </Box>
      ) : null}

      <Image
        size={"lg"}
        src={img}
        borderRadius=".4rem"
        h={"250px"}
        w={"100%"}
        objectFit={"cover"}
        alt={specie}
        mb={1}
      />

      <Heading
        fontSize={"2xl"}
        fontFamily={"heading"}
        textTransform="uppercase"
      >
        {specie}
      </Heading>

      <Box display="flex" justifyContent="center" alignItems="center" h="2rem">
        <Text
          fontWeight={500}
          color={"gray.500"}
          fontFamily={"body"}
          textTransform="uppercase"
        >
          {size}
        </Text>{" "}
        {sex === "macho" ? (
          <Icon as={IoMdMale} fontSize="1.1rem"></Icon>
        ) : (
          <Icon as={IoMdFemale} fontSize="1.1rem"></Icon>
        )}
      </Box>
      {value !== "update" ? (
        <Text
          fontWeight={"bold"}
          textAlign={"center"}
          color={"gray.500"}
          fontFamily={"heading"}
          px={3}
        >
          <Link href={"#"} color={"blue.400"}>
            #adoptaun{specie}
          </Link>
        </Text>
      ) : null}

      <Stack align={"center"} justify={"center"} direction={"row"} mt={2}>
        <Badge
          px={2}
          py={1}
          bg={"gray.100"}
          fontWeight={"400"}
          display="flex"
          alignItems="center"
          h="1.8rem"
        >
          <MdPlace fontSize="1.1rem" />
          {area}
        </Badge>
      </Stack>

      {value === "update" ? (
        <Button
          fontFamily={"body"}
          size="sm"
          bg={"orange.300"}
          color={"white"}
          w="30%"
          mt=".3rem"
          _hover={{
            bg: "orange.400",
            /* color:"brand.green.100" */
          }}
          onClick={(e) => handlerNavigateUpdate(e)}
        >
          Editar
        </Button>
      ) : null}
    </Box>
  );
};

export default PetCard;
