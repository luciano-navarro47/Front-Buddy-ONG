import React, { useState } from "react";
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
  HStack,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BiHide, BiShow } from "react-icons/bi";
import { loginUser } from "redux/actions/userActions";
import { validateLoginForm } from "utils/formValidations/loginForm";

const Login = ({
  user,
  setUser,
  isAuthenticated,
  loginWithRedirect,
  handleLogout,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({ email: "", password: "" });
  const [inputErrors, setInputErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

  if (isAuthenticated) {
    return (
      <Box display="flex" flexDirection="column">
        <Button
          onClick={() => navigate("/")}
          colorScheme="teal"
          marginBottom="1rem"
        >
          Ir a la página
        </Button>
        <Button onClick={handleLogout} colorScheme="red">
          Cerrar sesión
        </Button>
      </Box>
    );
  }

  return (
    <div>
      <div>
        <form>
          <Box mt={1} mb={"1rem"}>
            <Stack spacing={6}>
              <Input
                type="email"
                name="email"
                bg={"gray.100"}
                focusBorderColor={"brand.green.300"}
                placeholder="Correo electrónico"
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
              <InputGroup size="md">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  bg={"gray.100"}
                  focusBorderColor={"brand.green.300"}
                  placeholder="Contraseña"
                  border={1}
                  color={"gray.500"}
                  onChange={handleChange}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    color={"gray.500"}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <BiHide size={25} /> : <BiShow size={25} />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {inputErrors.password && (
                <Text className="text_inputError" fontSize={"0.8rem"}>
                  {inputErrors.password}
                </Text>
              )}
            </Stack>
          </Box>
        </form>
        <HStack
          align={"center"}
          justify={"center"}
          gap={1}
          flexWrap={"wrap"}
          width={"100%"}
        >
          <Box flex={1} minW={{ base: "100%", sm: "45%" }}>
            <Button
              onClick={handlerSubmit}
              type="submit"
              fontFamily={"body"}
              size="lg"
              bg={"orange.300"}
              color={"white"}
              mt={4}
              w={"100%"}
              _hover={{
                bg: "orange.400",
              }}
            >
              Iniciar sesión
            </Button>
          </Box>
          <Box flex={1} minW={{ base: "100%", sm: "45%" }}>
            <Button
              onClick={() => navigate("/register")}
              type="submit"
              fontFamily={"body"}
              border="1px solid"
              borderColor="gray.300"
              size="lg"
              color={"blackAlpha.600"}
              mt={4}
              w={"100%"}
              _hover={{
                bg: "orange.400",
                color: "white",
              }}
            >
              Crear cuenta
            </Button>
          </Box>
        </HStack>
      </div>
      <Divider
        orientation="horizontal"
        mt="2rem"
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
            Usar otros métodos{" "}
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
          color={"brand.green.300"}
          size="lg"
          w="50%"
          px="1rem"
        >
          <Button
            fontFamily={"body"}
            fontSize="1rem"
            fontWeight={"bold"}
            onClick={() => navigate("/")}
            textAlign={"center"}
          >
            Ingresar como invitado
          </Button>
        </Box>
      </Center>
    </div>
  );
};

export default Login;
