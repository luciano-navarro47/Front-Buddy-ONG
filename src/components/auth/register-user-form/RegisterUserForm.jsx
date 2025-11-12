import React, { useState } from "react";
import { Flex, Box, Stack, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  postUser,
  checkUsernameAvailability,
} from "../../../redux/actions/userActions";
import {
  USERNAME_REGEX,
  validateRegisterUserForm,
} from "../../../utils/formValidations/registerUserForm";
import AlertForm from "components/commons/alerts/alertForm/AlertForm";
import PersonalInfoFields from "./fields/PersonalInfoFields";
import AccountFields from "./fields/AccountFields";
import ContactField from "./fields/ContactField";

export default function RegisterUserForm({ setUser }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(null); // null = not checked, true/false = result
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hasRequiredFields = (data) =>
    Boolean(
      data.first_name &&
        data.last_name &&
        data.email &&
        data.username &&
        data.phone &&
        usernameError === ""
    );

  const extractApiErrors = (error) => {
    const payload = error?.response?.data;
    const errorsArray =
      payload?.errors || (Array.isArray(payload) ? payload : null);

    if (Array.isArray(errorsArray) && errorsArray.length > 0) {
      const mapped = {};
      errorsArray.forEach((it) => {
        if (it.param) mapped[it.param] = it.msg || true;
      });
      if (mapped.hasOwnProperty("email")) {
        mapped["email"] = "Este correo ya está en uso.";
      }
      if (mapped.hasOwnProperty("username")) {
        if (mapped.username === "Invalid value") {
          mapped.username = "Nombre de usuario inválido";
        }
      }
      return mapped;
    }

    return { general: "Ocurrió un error. Intentá nuevamente." };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.replace(/^\s+/, "");

    if (name === "email") {
      setInputError((prev) => ({ ...prev, email: "" }));
    }

    setInput((prevInput) => {
      const updatedInput = { ...prevInput, [name]: trimmedValue };
      setInputError(validateRegisterUserForm(updatedInput));
      return updatedInput;
    });

    if (name === "username") {
      setIsUsernameAvailable(null);

      if (typingTimeout) clearTimeout(typingTimeout);
      setTypingTimeout(
        setTimeout(() => {
          const u = trimmedValue;
          console.log("u", u);
          if (u.length < 3 || u.length > 10) {
            setUsernameError("Ingresá entre 3 y 10 caracteres");
            setIsUsernameAvailable(null);
            return;
          }
          if (!USERNAME_REGEX.test(u)) {
            setUsernameError(
              "Solo se permiten letras, números y guiones bajos"
            );
            setIsUsernameAvailable(null);
            return;
          }

          setUsernameError("");
          checkUserName(u);
        }, 500)
      );
    }
  };

  const checkUserName = async (username) => {
    if (!username || username.length < 3) return;
    try {
      setIsCheckingUsername(true);
      const available = await dispatch(checkUsernameAvailability(username));

      if (available === null) {
        setUsernameError("");
        setIsUsernameAvailable(null);
        return;
      }

      setIsUsernameAvailable(available);
      setUsernameError(available ? "" : "Apodo no disponible.");
    } catch (error) {
      setIsCheckingUsername(false);

      setIsUsernameAvailable(null);
      setUsernameError("Ocurrió un error. Intentá nuevamente.");
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setShowAlert(false);
    setInfoSend(false);

    if (!hasRequiredFields(input)) {
      setIsIncomplete(true);
      setShowAlert(true);
      return;
    }

    setIsIncomplete(false);
    setIsSubmitting(true);

    try {
      const res = await dispatch(postUser(input));

      if (res && res.status === 201 && res.data) {
        setInfoSend(true);
        setShowAlert(true);
        navigate("/");
        return;
      }
    } catch (err) {
      // console.error("Register error:", err);

      const parsed = extractApiErrors(err);

      if (parsed.email) {
        setInputError((prev) => ({ ...prev, email: parsed.email }));
        const el = document.querySelector('input[name="email"]');
        if (el) el.focus();
      } else if (parsed.general) {
        setShowAlert(true);
      } else {
        setShowAlert(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form id="registerUserForm" onSubmit={handleSubmit}>
      {/* Alerts */}
      {isIncomplete && showAlert && (
        <AlertForm
          status="error"
          title="Error: "
          description="Asegurate de llenar todos los campos correctamente."
          setShowAlert={setShowAlert}
        />
      )}
      {infoSend && showAlert && (
        <AlertForm
          status="success"
          title="Excelente: "
          description={`Tu huella humana ha sido registrada. ¡Ahora podés iniciar sesión!`}
          setShowAlert={setShowAlert}
        />
      )}

      <Flex align="center" justify="center" bg="white">
        <Stack spacing={8} mx="auto" maxW="lg" py={6}>
          <Box rounded="lg" bg="brand.green.200" boxShadow="lg" p={10}>
            <Box align="left" mb={"1rem"}>
              <Text
                fontFamily="heading"
                fontWeight="bold"
                color="gray.600"
                fontSize={35}
                align={"left"}
                textDecoration={"underline"}
              >
                Formulario de registro
              </Text>
            </Box>

            <Stack spacing={8}>
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
                isUsernameAvailable={isUsernameAvailable}
                isCheckingUsername={isCheckingUsername}
              />
              <ContactField
                input={input}
                inputError={inputError}
                handleChange={handleChange}
              />

              {/* Buttons */}
              <Stack spacing={4} pt={2}>
                <Button
                  type="submit"
                  isLoading={isSubmitting}
                  disabled={usernameError !== "" || isUsernameAvailable === false || isSubmitting}
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
                  color="gray.500"
                  borderColor="gray.300"
                  _hover={{ bg: "brand.green.300", color: "white" }}
                >
                  Atrás
                </Button>
                <Text fontSize="lg" color="gray.600">
                  Gracias por cuidar, respetar y amar a los animales.
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </form>
  );
}
