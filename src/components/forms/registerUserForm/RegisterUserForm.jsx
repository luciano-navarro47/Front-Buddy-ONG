import React, { useState, useEffect } from "react";
import { Flex, Box, Stack, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  postUser,
//   updateUser,
//   getUserById,
  checkUsernameAvailability,
} from "../../../redux/Actions/userActions";
import { validateRegisterUserForm } from "../../../utils/formValidations/registerUserForm";
import { AlertForm } from "../../Alerts/AlertForm/AlertForm";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AccountFields from "./fields/AccountFields";
import ContactField from "./fields/ContactField";

export default function RegisterUserForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const userInfo = useSelector((state) => state.user);

  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
//   const [user, setUser] = useState([]);
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
    password: "",
  });

  // ✅ Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setInput((prevInput) => {
      const updatedInput = { ...prevInput, [name]: trimmedValue };
      setInputError(validateRegisterUserForm(updatedInput));
      return updatedInput;
    });

    if (name === "username") {
      if (typingTimeout) clearTimeout(typingTimeout);
      setTypingTimeout(setTimeout(() => checkUserName(trimmedValue), 500));
    }
  };

  // ✅ Username availability check
  const checkUserName = async (username) => {
    if (username.length < 3) return;
    try {
      const available = await dispatch(checkUsernameAvailability(username));
      setUsernameError(available ? "" : "Apodo no disponible.");
    } catch (error) {
      console.log("Username verification error: ", error);
    }
  };

  // ✅ Submit handler
  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (
      input.first_name &&
      input.last_name &&
      input.email &&
      input.username &&
      input.phone &&
      usernameError === ""
    ) {
      const res = await dispatch(postUser(input));

      if (res.status === 200) {
        localStorage.setItem("loggedUser", JSON.stringify(res.data));
        navigate("/");
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

  return (
    <form id="registerUserForm">
      {/* ✅ Alerts */}
      {isIncomplete && showAlert && (
        <AlertForm
          status="error"
          title="Error"
          description="Asegurate de llenar todos los campos correctamente."
          setShowAlert={setShowAlert}
        />
      )}
      {infoSend && showAlert && (
        <AlertForm
          status="success"
          title="Correcto"
          description="Te registraste correctamente. Ahora podés iniciar sesión."
          setShowAlert={setShowAlert}
        />
      )}

      <Flex align="center" justify="center" bg="brand.green.200">
        <Stack spacing={8} mx="auto" maxW="lg" py={6}>
          <Stack align="center">
            <Text
              fontFamily="heading"
              fontWeight="bold"
              color="gray.600"
              fontSize="5xl"
              textAlign="center"
            >
              Registrate
            </Text>
          </Stack>

          <Box rounded="lg" bg="white" boxShadow="lg" p={8}>
            <Stack spacing={4}>
              <PersonalInfoFields
                input={input}
                inputError={inputError}
                handleChange={handleChange}
              />
              <AccountFields
                input={input}
                inputError={inputError}
                usernameError={usernameError}
                handleChange={handleChange}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
              <ContactField
                input={input}
                inputError={inputError}
                handleChange={handleChange}
              />

              {/* ✅ Buttons */}
              <Stack spacing={4} pt={2}>
                <Button
                  onClick={(e) => [handlerSubmit(e), window.scrollTo(0, 0)]}
                  disabled={usernameError !== ""}
                  loadingText="Registrarse"
                  size="lg"
                  bg="orange.300"
                  color="white"
                  _hover={{ bg: "orange.400" }}
                >
                  Registrarse
                </Button>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outline"
                  size="lg"
                  color="black"
                  borderColor="gray.300"
                  _hover={{ bg: "brand.green.300", color: "white" }}
                >
                  Atrás
                </Button>
                <Text fontSize="lg" color="gray.600">
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
