import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../Card/Card";
import { Heading, Container, Text, Center, Box } from "@chakra-ui/react";
import { getUserId } from "../../redux/Actions/userActions";
import s from "./MyPets.module.css";

export default function MyPets({user, setUser}) {
  const dispatch = useDispatch();
  const userRedux = useSelector((state) => state.user);
  const userPets = userRedux[0]?.pet;
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));

  useEffect(() => {
    dispatch(getUserId(loggedUser.id));
  }, [dispatch, userPets, loggedUser.id]);

  return (
    <>
      <Box bg={"brand.green.200"} mb="3rem">
        <Heading as="h1" fontSize="2.5rem" pt="3rem" color="gray.800">
          {" "}
          Mis mascotas
        </Heading>
        {/* DETAIL */}
        <Container>
          <Text
            fontFamily={"body"}
            fontWeight={"300"}
            /* noOfLines={[4, 4, 3]} */
            px="1rem"
            pt={["0.5rem", "0.5rem", "1rem"]}
            pb="2rem"
            my="0rem"
            fontSize={{ base: "20px", md: "20px", lg: "22px" }}
            color="gray.500"
          >
            Aquí están todas tus publicaciones, podrás editar su información,
            tanto como para borrarlas
          </Text>
        </Container>
      </Box>
      <Center>
        <div className={s.divContainer}>
          {userPets && userPets[0] ? (
            userPets.map((pet) => <Card data={pet} value={"update"} />)
          ) : (
            <Box display="flex" justifyContent={"center"} width={"100%"}>
              <Text fontSize="2rem" marginBottom={"2rem"}>
                No tienes mascotas publicadas
              </Text>
            </Box>
          )}
        </div>
      </Center>
    </>
  );
}
