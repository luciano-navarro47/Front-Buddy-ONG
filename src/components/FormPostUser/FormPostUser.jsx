import { MdCancel, MdCheckCircle } from "react-icons/md";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Text,
  InputGroup,
  InputRightElement,
  InputLeftAddon,
} from "@chakra-ui/react";

import {
  // ErrorForm,
  // SuccedForm,
  AlertForm,
} from "../Alerts/AlertForm/AlertForm";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postUser,
  updateUser,
  getUserById,
  checkUsernameAvailability,
} from "../../redux/Actions/userActions";
import { validateRegisterUserForm } from "../../utils/formValidations/registerUserForm";

export default function FormPostUser({ id, value }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);
  const userInfo = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [user, setUser] = useState([]);
  const [usernameError, setUsernameError] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [inputError, setInputError] = useState({});
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [infoSend, setInfoSend] = useState(false);
  const [input, setInput] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setInput((prevInput) => {
      const updatedInput = { ...prevInput, [name]: trimmedValue };
      setInputError(validateRegisterUserForm(updatedInput));
      return updatedInput;
    });

    if (name === "username") {
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setTypingTimeout(
        setTimeout(() => {
          checkUserName(trimmedValue);
        }, 500)
      );
    }
  };

  const handlerSubmit = async (e, value) => {
    e.preventDefault();
    if (
      input.first_name &&
      input.last_name &&
      input.email &&
      input.username &&
      input.phone &&
      usernameError === ""
    ) {
      if (value === undefined) {
        const res = await dispatch(postUser(input));
        if (res.status === 200) {
          localStorage.setItem("loggedUser", JSON.stringify(res.data));
          navigate("/");
        }
      } else {
        const res = await dispatch(updateUser(userInfo[0]?.id, input));
        if (res.status === 200) {
          localStorage.setItem("loggedUser", JSON.stringify(res.data));
          navigate("/");
        }
      }

      setIsIncomplete(false);
      setInfoSend(true);
      setShowAlert(true);
    } else {
      setIsIncomplete(true);
      setInfoSend(false);
      setShowAlert(true);
    }
  };

  const checkUserName = async (username) => {
    if (username.length < 3) return;

    try {
      const available = await dispatch(checkUsernameAvailability(username));
      setUsernameError(available ? "" : "Apodo no disponible.");
    } catch (error) {
      console.log("Username verification error: ", error);
    }
  };

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const logged = JSON.parse(loggedUser);
      setUser(logged);
    }
  }, []);
  useEffect(() => {
    if (value === "update" && user.length) dispatch(getUserById(user[0]?.id));
  }, [dispatch, user, value]);

  useEffect(() => {
    if (value === "update" && userInfo[0]) {
      setInput({
        first_name: userInfo[0].first_name || "",
        last_name: userInfo[0].last_name || "",
        email: userInfo[0].email || "",
        username: userInfo[0].username || "",
        role: userInfo[0].role || "",
        phone: userInfo[0].phone || "",
      });
    }
  }, [userInfo, value]);

  return (
    <form id="registerUserForm">
      {isIncomplete && showAlert && (
        <AlertForm
          status="error"
          title="Error: "
          description="Asegurate de llenar todos los campos y de no tener errores en el formulario."
          setShowAlert={setShowAlert}
        />
      )}
      {infoSend && showAlert && (
        <AlertForm
          status="success"
          title="Correcto: "
          description="Te registraste correctamente. Ahora podés iniciar sesión."
          setShowAlert={setShowAlert}
        />
      )}
      <Flex
        // minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg="brand.green.200"
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"}>
          <Stack align={"center"}>
            <Text
              fontFamily="heading"
              fontWeight={"bold"}
              color="gray.600"
              fontSize={"5xl"}
              textAlign={"center"}
              textShadow={""}
            >
              Registrate
            </Text>
          </Stack>

          <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl id="first_name" isRequired>
                    <FormLabel>Nombre: </FormLabel>
                    <Input
                      autoComplete="off"
                      type="text"
                      value={input.name}
                      name="first_name"
                      key="first_name"
                      focusBorderColor={"brand.green.300"}
                      fontFamily={"body"}
                      onChange={(e) => handleChange(e)}
                    />
                    {inputError.first_name && (
                      <Text className="text_inputError">
                        {inputError.first_name}
                      </Text>
                    )}
                  </FormControl>

                  <FormControl id="last_name" isRequired>
                    <FormLabel>Apellido: </FormLabel>
                    <Input
                      autoComplete="off"
                      value={input.name}
                      name="last_name"
                      type="text"
                      key="last_name"
                      focusBorderColor={"brand.green.300"}
                      fontFamily={"body"}
                      onChange={(e) => handleChange(e)}
                    />
                    {inputError.last_name && (
                      <Text className="text_inputError">
                        {inputError.last_name}
                      </Text>
                    )}
                  </FormControl>
                </Box>
              </HStack>

              <FormControl id="username" isRequired>
                <FormLabel>Nombre de usuario: </FormLabel>
                <Input
                  key="username"
                  type="text"
                  name="username"
                  value={input.username}
                  onChange={(e) => handleChange(e)}
                  autoComplete="off"
                  focusBorderColor={"brand.green.300"}
                  fontFamily={"body"}
                />
                {inputError.username ? (
                  <Text className="text_inputError">{inputError.username}</Text>
                ) : (
                  input.username.length >= 3 &&
                  (usernameError ? (
                    <Text
                      color="red.500"
                      fontSize="sm"
                      display="flex"
                      alignItems="center"
                      mt={2}
                    >
                      <MdCancel /> Usuario no disponible
                    </Text>
                  ) : (
                    <Text
                      color="green.500"
                      fontSize="sm"
                      display="flex"
                      alignItems="center"
                      mt={2}
                    >
                      <MdCheckCircle /> Usuario disponible
                    </Text>
                  ))
                )}
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email: </FormLabel>
                <Input
                  autoComplete="off"
                  name="email"
                  type="text"
                  value={input.email}
                  key="email"
                  placeholder="tumail@mail.com"
                  focusBorderColor={"brand.green.300"}
                  fontFamily={"body"}
                  onChange={(e) => handleChange(e)}
                ></Input>
                {inputError.email && (
                  <Text className="text_inputError">{inputError.email}</Text>
                )}
              </FormControl>

              {value === null ? null : (
                <FormControl id="password" isRequired>
                  <FormLabel>Contraseña: </FormLabel>
                  <InputGroup size="md">
                    <Input
                      autoComplete="off"
                      placeholder="Ingresar una contraseña"
                      name="password"
                      key="password"
                      focusBorderColor={"brand.green.300"}
                      fontFamily={"body"}
                      type={show ? "text" : "password"}
                      onChange={(e) => handleChange(e)}
                    />
                    <InputRightElement width="4.5rem">
                      <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                    {inputError.password && <Text>{inputError.password}</Text>}
                  </InputGroup>
                </FormControl>
              )}

              <FormControl id="phone" isRequired>
                <FormLabel>Cel/Teléfono:</FormLabel>
                <InputGroup size="sm">
                  <InputLeftAddon
                    bg="gray.50"
                    _dark={{
                      bg: "gray.800",
                    }}
                    color="gray.500"
                    rounded="md"
                    fontWeight={"bold"}
                  >
                    +54
                  </InputLeftAddon>
                  <Input
                    autoComplete="off"
                    type="number"
                    name="phone"
                    value={input.phone}
                    focusBorderColor={"brand.green.300"}
                    fontFamily={"body"}
                    onChange={(e) => handleChange(e)}
                  />
                </InputGroup>
                {inputError.phone && (
                  <Text className="text_inputError">{inputError.phone}</Text>
                )}
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  onClick={(e) => [handlerSubmit(e), window.scrollTo(0, 0)]}
                  disabled={usernameError !== ""}
                  loadingText="Registrarse"
                  fontFamily={"body"}
                  size="lg"
                  bg={"orange.300"}
                  color={"white"}
                  _hover={{
                    bg: "orange.400",
                  }}
                >
                  Registrarse
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  type="submit"
                  fontFamily={"body"}
                  border="1px solid"
                  borderColor="gray.300"
                  size="lg"
                  color={"black"}
                  w={"100%"}
                  shadow={"md"}
                  _hover={{
                    bg: "brand.green.300",
                    color: "white",
                  }}
                >
                  Atrás
                </Button>

                <Text fontSize={"lg"} color={"gray.600"}>
                  Gracias por cuidar a los animales ✌️
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
