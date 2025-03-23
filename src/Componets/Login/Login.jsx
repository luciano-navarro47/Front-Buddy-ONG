import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Box,
  Stack,
  Text,
  Input,
  Button,
  Divider,
  Center,
} from "@chakra-ui/react";

function validateForm(input) {
  const errors = {};

  if (!input.email) {
    errors.email = "Ingresa tu correo electrónico";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "El correo eletrónico no es válido";
  }

  if (!input.password) {
    errors.password = "Ingresa tu contraseña";
  }

  return errors;
}

const Login = ({ loggedUser, handleSetUserFlag }) => {
  const navigate = useNavigate();
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const [input, setInput] = useState({ email: "", password: "" });
  const [inputErrors, setInputErrors] = useState({});
  const [user, setUser] = useState("");
  console.log("USERR LOGIN: ", user);
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedInput = { ...input, [name]: value };
    setInput(updatedInput);

    const errors = validateForm(updatedInput);
    setInputErrors(errors);
  };

  const closeSession = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
    handleSetUserFlag();
    logout({ returnTo: window.location.origin });
    navigate("/");
  };

  const loginPost = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/login",
        formData
      );

      if (
        response.data.error &&
        response.data.error === "Correo electrónico incorrecto"
      ) {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          email: "Correo eletrónico incorrecto",
        }));
      } else if (response.data.error === "Contraseña incorrecta") {
        setInputErrors((prevErrors) => ({
          ...prevErrors,
          password: "Contraseña incorrecta",
        }));
      }

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error: ", error);

      if (error.response) {
        const errorMessage = error.response.data.error || "Error inesperado";
        alert(errorMessage);
      } else {
        alert("Error inesperado: " + error.message);
      }
    }
  };

  const handlerSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(input);
    if (Object.keys(errors).length === 0) {
      loginPost(input);
    } else {
      console.log("SET ERROR");
      setInputErrors(errors);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <>
      {user?.length > 0 ? (
        <Box display="flex" flexDirection="column">
          <Button
            colorScheme="teal"
            marginBottom="1rem"
            letterSpacing=".15rem"
            fontSize="1.2rem"
            fontWeight="400"
            onClick={(e) => navigate("/home")}
          >
            Ir a la pagina
          </Button>
          <Button
            className="btn btn-danger"
            onClick={() => closeSession()}
            colorScheme="red"
            letterSpacing=".15rem"
            fontSize="1.2rem"
            fontWeight="400"
          >
            Cerrar Sesion
          </Button>
        </Box>
      ) : (
        <div>
          {" "}
          <div>
            <form>
              <Box as={"form"} mt={1}>
                <Stack spacing={4}>
                  <Input
                    type="email"
                    name="email"
                    bg={"gray.100"}
                    focusBorderColor={"brand.green.300"}
                    placeholder="Ingresa tu Email"
                    border={1}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                    onChange={handleChange}
                  ></Input>
                  {inputErrors.email && (
                    <Text className="text_inputError" fontSize={"0.8rem"}>
                      {inputErrors.email}
                    </Text>
                  )}

                  <Input
                    type="password"
                    name="password"
                    bg={"gray.100"}
                    focusBorderColor={"brand.green.300"}
                    placeholder="Ingresa tu contraseña"
                    border={1}
                    color={"gray.500"}
                    _placeholder={{
                      color: "gray.500",
                    }}
                    onChange={handleChange}
                  />
                  {inputErrors.password && (
                    <Text className="text_inputError" fontSize={"0.8rem"}>
                      {inputErrors.password}
                    </Text>
                  )}
                </Stack>
              </Box>
            </form>
            <Box py="1rem">
              <Button
                onClick={handlerSubmit}
                type="submit"
                fontFamily={"body"}
                size="lg"
                bg={"orange.300"}
                color={"white"}
                w="40%"
                px="3rem"
                _hover={{
                  bg: "orange.400",
                }}
              >
                Ingresar
              </Button>
            </Box>
            <Box py="1rem">
              <Text fontFamily={"body"}>No estás registrado?</Text>
              <Link to={`/createUser`}>
                <Text
                  _hover={{
                    color: "brand.green.300",
                    fontWeight: "bold",
                  }}
                >
                  hazlo aquí
                </Text>
              </Link>
            </Box>
          </div>
          <Divider
            orientation="horizontal"
            mt="1rem"
            pt="6px"
            bg="gray.200"
            borderRadius="7px"
          />
          <Link />
          <Box mt="1rem">
            <Button
              fontFamily={"body"}
              size="lg"
              bg={"orange.300"}
              color={"white"}
              w="40%"
              px={{ base: "6rem", sm: "6rem", md: "6rem", lg: "6rem" }}
              _hover={{
                bg: "orange.400",
              }}
              onClick={() => loginWithRedirect()}
            >
              <Text
                fontSize={{ base: "16px", sm: "16px", md: "16px", lg: "1rem" }}
              >
                Ingresar Con Google{" "}
              </Text>
            </Button>
          </Box>
          <Divider
            orientation="horizontal"
            mt="1rem"
            pt="6px"
            bg="gray.200"
            borderRadius="7px"
          />
          <Center>
            <Box
              py="1rem"
              mt="1rem"
              borderRadius={7}
              color={"brand.green.300"}
              size="lg"
              w="50%"
              px="1rem"
              _hover={{
                bg: "orange.100",
                fontWeight: "bold",
              }}
            >
              <Link to={`/home`}>
                <Text
                  fontFamily={"body"}
                  fontSize="1.2rem"
                  _hover={{
                    color: "brand.green.300",
                  }}
                >
                  Usuario invitado
                </Text>
              </Link>
            </Box>
          </Center>
        </div>
      )}
    </>
  );
};

export default Login;
