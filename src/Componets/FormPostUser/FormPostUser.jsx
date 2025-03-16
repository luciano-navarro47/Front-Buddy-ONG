import logo from "../../assets/imagenes/logo_negro.png";
import { MdArrowBackIosNew, MdCancel, MdCheckCircle } from "react-icons/md";
import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	HStack,
	Stack,
	Button,
	Heading,
	Text,
	InputGroup,
	InputRightElement,
	InputLeftAddon,
	Icon,
	Image,
  } from "@chakra-ui/react";

import { ErrorForm, SuccedForm } from "../FormPostPet/AlertForm/AlertForm";

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postUser, updateUser, getUserId, checkUsernameAvailability } from "../../Redux/Actions/userActions";



// REGEXP for email
let isEmail = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");

const validateForm = (input) => {
  let inputError = {};

  // We us default values to prevent them from being undefined
  const name = input.name || "";
  const surname = input.surname || "";
  const email = input.email || "";
  const username = input.username || "";
  const phone = input.phone || "";

  if (name === "" || name.length === 0) {
    inputError.name = "Debes ingresar tu nombre";
  }
  if (surname === "" || surname.length === 0) {
    inputError.surname = "Debes ingresar tu apellido";
  }
  if (email === "" || email.length === 0) {
    inputError.email = "Debes ingresar tu e-mail";
  } else if (!isEmail.test(email)) {
    inputError.email = "Ingresa un formato de e-mail válido";
  }
  if (username === "" || username.length === 0) {
    inputError.username = "Debes ingresar un nombre de usuario.";
  }
  if (phone !== "" && phone.length !== 10) {
    inputError.phone = "Debe ser un número de 10 dígitos";
  }
  return inputError;
};

export default function FormPostUser({ id, value }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);
  const usernameAvailable = useSelector((state) => state.usernameAvailable);
  const userInfo = useSelector((state) => state.user);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState([]);
  const [usernameError, setUsernameError] = useState("");
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [inputError, setInputError] = useState({});
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [infoSend, setInfoSend] = useState(false);
  const [input, setInput] = useState({
	  name: "",
	  surname: "",
	  email: "",
	  username: "",
	  phone: ""
	});

  // console.log("USER INFO: ", input);
  // const loggedUser = localStorage.getItem("loggedUser");


  const handleChange = (e) => {
	  const { name, value } = e.target;
	  const trimmedValue = value.trim();

    setInput((prevInput) => {
      const updatedInput = {...prevInput, [name]: trimmedValue}
      setInputError(validateForm(updatedInput));
      return updatedInput;
    });

	  if (name === "username") {
	  	if (typingTimeout) {
        clearTimeout(typingTimeout);
      }
      setTypingTimeout(setTimeout(() => {
        checkUserName(trimmedValue);
      }, 500));
	  }
  }

  const handlerSubmit = (e, value) => {
    e.preventDefault();
    if (
      input.name &&
      input.surname &&
      input.email &&
      input.username &&
      input.phone
    ) {
      if (value === undefined) {
        dispatch(postUser(input));
        navigate("/");
      } else {
        dispatch(updateUser(userInfo[0]?.id, input));
      }

      setIsIncomplete(false);
      setInfoSend(true);
    } else {
      setIsIncomplete(true);
      setInfoSend(false);
    }
  };

  const checkUserName = async (username) => {
	  if(username.length < 3) return;
    
	  try {
	  	const available = await dispatch(checkUsernameAvailability(username));
      
      if (available === false){
	  		setUsernameError("Apodo no disponible.");
	  	} else {
        setUsernameError("");
      }
	  } catch (error) {
	  	console.log("Username verification error: ", error);
	  }
  }

  useEffect(() => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const logged = JSON.parse(loggedUser);
      setUser(logged);
    }
  }, []);
  useEffect(() => {
    if (value === "update" && user.length)
      dispatch(getUserId(user[0]?.id));
  }, [dispatch, user]);

  useEffect(() => {
    if (value === "update" && userInfo[0]) {
      setInput({
        name: userInfo[0].name || "",
        surname: userInfo[0].surname || "",
        email: userInfo[0].email || "",
        username: userInfo[0].username || "",
        role: userInfo[0].role || "",
        phone: userInfo[0].phone || "",
      });
    }
  }, [userInfo, value]);
  

  useEffect(() => {
    if(usernameAvailable === false) {
      setUsernameError("Este aoidi ya está en uso.");
    } else {
      setUsernameError("");
    }
  }, [usernameAvailable]);

  return (
    <div>
      {isIncomplete ? <ErrorForm /> : null}
      {infoSend ? <SuccedForm /> : null}

      <form id="myForm">
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg="brand.green.200"
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Link to={value === "update" ? "/home" : "/"}>
              <Icon
                as={MdArrowBackIosNew}
                color="orange.400"
                boxSize={7}
                _hover={{
                  color: "grey",
                  boxSize: "8",
                }}
              />
              <Icon
                as={MdArrowBackIosNew}
                color="orange.400"
                boxSize={7}
                _hover={{
                  color: "grey",
                  boxSize: "8",
                }}
              />
              <Button
                fontFamily={"body"}
                bg="base.green.100"
                color={"grey"}
                fontSize={"1.4rem"}
                _hover={{
                  color: "orange.400",
                }}
                p="0"
                mr="1rem"
              >
                {" "}
                Atrás
              </Button>
            </Link>
            {value === undefined ? (
              <Stack align={"center"}>
                <Text
                  fontFamily="heading"
                  fontWeight={"bold"}
                  color="gray.600"
                  fontSize={"5xl"}
                  textAlign={"center"}
                  textShadow={""}
                >
                  Crea tu cuenta!
                </Text>
                <Text fontSize={"lg"} color={"gray.600"}>
                  Gracias por cuidar a los animales ✌️
                </Text>
                <Box width={20} height={20}>
                  <Image src={logo}></Image>
                </Box>
              </Stack>
            ) : (
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Actualizá la información de perfil
                </Heading>
              </Stack>
            )}

            <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="name" isRequired>
                      <FormLabel>Nombre: </FormLabel>
                      <Input
                        autoComplete="off"
                        type="text"
                        value={input.name}
                        name="name"
                        key="name"
                        focusBorderColor={"brand.green.300"}
                        fontFamily={"body"}
                        onChange={(e) => handleChange(e)}
                      />
                      {inputError.name && (
                        <Text className="text_inputError">
                          {inputError.name}
                        </Text>
                      )}
                    </FormControl>

                    <FormControl id="surname" isRequired>
                      <FormLabel>Apellido: </FormLabel>
                      <Input
                        autoComplete="off"
                        value={input.surname}
                        name="surname"
                        type="text"
                        key="surname"
                        focusBorderColor={"brand.green.300"}
                        fontFamily={"body"}
                        onChange={(e) => handleChange(e)}
                      />
                      {inputError.surname && (
                        <Text className="text_inputError">
                          {inputError.surname}
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
                  {inputError.username? (
                    <Text className="text_inputError">{inputError.username}</Text>
                  ) : (
                    input.username.length >= 3 && (
                      usernameError ? (
                        <Text color="red.500" fontSize="sm" display="flex" alignItems="center"> 
                          <MdCancel style={{marginRight: "0.5rem"}}/> En uso
                        </Text>
                      ) : (
                        <Text color="green.500" fontSize="sm" display="flex" alignItems="center"> 
                          <MdCheckCircle style={{marginRight: "0.5rem"}}/> Disponible
                        </Text>
                      )
                    )
                  )
                }
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
                      {inputError.password && (
                        <Text>{inputError.password}</Text>
                      )}
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
                    >
                      +54 9
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
                  {value === undefined ? (
                    <Button
                      onClick={(e) => [handlerSubmit(e), window.scrollTo(0, 0)]}
                      loadingText="Post mascota"
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
                  ) : (
                    <Button
                      onClick={(e) => [
                        handlerSubmit(e, value, id),
                        window.scrollTo(0, 0),
                      ]}
                      loadingText="Registrarse"
                      fontFamily={"body"}
                      size="lg"
                      bg={"orange.300"}
                      color={"white"}
                      _hover={{
                        bg: "orange.400",
                      }}
                    >
                      Guardar cambios
                    </Button>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </div>
  );
}
