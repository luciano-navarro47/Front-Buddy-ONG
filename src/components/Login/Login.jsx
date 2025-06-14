import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Box,
  Stack,
  Text,
  Input,
  Button,
  Divider,
  Center,
} from "@chakra-ui/react";
import { loginUser } from "../../redux/Actions/userActions";
import { validateLoginForm } from "../../utils/formValidations/loginForm";

const Login = ({user, setUser, closeSession, isAuthenticated, loginWithRedirect}) => {
  // console.log("IS AUTH?: ", isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({ email: "", password: "" });
  const [inputErrors, setInputErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedInput = { ...input, [name]: value };
    setInput(updatedInput);
    setInputErrors(validateLoginForm(updatedInput));
  };
  
  const handlerSubmit = async (e) => {
    e.preventDefault();
    const errors = validateLoginForm(input);

    if (Object.keys(errors).length === 0) {
      await loginUser(input, dispatch, setUser, setInputErrors, navigate);
    } else {
      setInputErrors(errors);
    }
  };

  if (isAuthenticated || (user && Object.keys(user).length > 0)) {
    return (
      <Box display="flex" flexDirection="column">
        <Button
          onClick={() => navigate("/")}
          colorScheme="teal"
          marginBottom="1rem"
        >
          Ir a la página
        </Button>
        <Button onClick={closeSession} colorScheme="red">
          Cerrar sesión
        </Button>
      </Box>
    );
  }

  return (
    <div>
      <div>
        <form>
          <Box mt={1}>
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
            Iniciar sesión
          </Button>
        </Box>
        <Box py="1rem">
          <Text fontFamily={"body"}></Text>
          <Link to={`/createUser`}>
            <Text
              _hover={{
                color: "brand.green.300",
                fontWeight: "bold",
              }}
            >
              ¿No estás registrado?
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
          <Text fontSize={{ base: "16px", sm: "16px", md: "16px", lg: "1rem" }}>
            Ingresar con Google{" "}
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
          <Link to={`/`}>
            <Text
              fontFamily={"body"}
              fontSize="1.2rem"
              _hover={{
                color: "brand.green.300",
              }}
            >
              Ingresar como invitado
            </Text>
          </Link>
        </Box>
      </Center>
    </div>
  );
};

export default Login;
