import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { SuccedForm, ErrorForm } from "../../Alerts/AlertForm/AlertForm";
import {
  Flex,
  Box,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  Icon,
} from "@chakra-ui/react";
import { getPetsByUser, postOrUpdatePet } from "../../../redux/Actions/petActions";
import { SelectField, selectConfigs } from "../FormFields/SelectField";
import { InputField, inputConfigs } from "../FormFields/InputField";
import { validateForm } from "utils/formValidations/postOrUpdatePetForm";
import { resetForm } from "utils/formValidations/profileForm";
import { usePetForm } from "utils/hooks/pet/usePetForm";

export default function FormPostPet({ isUpdating, userRole }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 1;

  const paramsId = useParams().id;

  const initialInputState = {
    specie: "",
    sex: "",
    age: "",
    size: "",
    status: "",
    area: "",
    detail: "",
    img: "",
  };

  const [isIncomplete, setIsIncomplete] = useState(false);
  const [infoSend, setInfoSend] = useState(false);
  const [inputError, setInputError] = useState({});
  const [input, setInput] = useState(initialInputState);
  const [isSubmitting, setIsSubmitting] = useState(false); // <-- loading state

  // Hook
  usePetForm(paramsId, initialInputState, setInput, isUpdating);

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setInput({
      ...input,
      [name]: value,
    });

    const updatedInput = { ...input, [name]: value };
    const errors = validateForm(updatedInput);

    setInputError((prevErrors) => ({
      ...prevErrors,
      [name]: errors[name] || "",
    }));
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const errors = validateForm(input);
    setInputError(errors);

    if (Object.keys(errors).length) {
      setIsIncomplete(true);
      setInfoSend(false);
      return;
    }

    setIsIncomplete(false);
    setInfoSend(false);
    setIsSubmitting(true);

    if (isUpdating !== true) {
      try {
        window.scrollTo(0, 0);

        const created = await dispatch(postOrUpdatePet(input));

        resetForm(setInput, setInputError, initialInputState);

        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (loggedUser?.id) {
          await dispatch(getPetsByUser(loggedUser.id));
        }

        setInfoSend(true);
        navigate("/account/myPets");
      } catch (error) {
        console.error("Error creando mascota:", error);
        setInfoSend(false);
        setIsSubmitting(false);
      }
    } else {
      // update case
      try {
        window.scrollTo(0, 0);
        await dispatch(postOrUpdatePet(input, isUpdating, paramsId));
        setInfoSend(true);
        const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
        if (loggedUser?.id) {
          await dispatch(getPetsByUser(loggedUser.id));
        }
        navigate(`/account/myPets?page=${pageParam}`);
      } catch (err) {
        console.error("Error actualizando mascota:", err);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <Box>
      {userRole === "admin" && (
        <Text color="gray.500" fontSize="sm" textAlign={"center"}>
          Editando como administrador
        </Text>
      )}
      {isIncomplete ? (
        <ErrorForm onClose={() => setIsIncomplete(false)} />
      ) : null}
      {/* {infoSend ? <SuccedForm onClose={() => setInfoSend(false)}/> : null} */}

      <form onSubmit={handlerSubmit} id="myForm">
        <Flex minH={"100%"} align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"2xl"} textAlign={"center"}>
                {isUpdating
                  ? userRole === "admin"
                    ? "Editando la mascota del usuario"
                    : "Editar mi mascota"
                  : "Publicar"}
              </Heading>
              <Text fontSize={"lg"} color={"gray.600"}>
                ¡Gracias por cuidar a los animales!
              </Text>
            </Stack>

            <Box rounded={"lg"} bg={"white"} boxShadow={"lg"} p={8}>
              <Stack spacing={4}>
                <HStack>
                  {selectConfigs.slice(0, 2).map((cfg) => (
                    <SelectField
                      key={cfg.id}
                      {...cfg}
                      value={input[cfg.name]}
                      error={inputError[cfg.name]}
                      onChange={handleChange}
                    />
                  ))}
                </HStack>

                {selectConfigs.slice(2).map((cfg) => (
                  <SelectField
                    key={cfg.id}
                    {...cfg}
                    value={input[cfg.name]}
                    error={inputError[cfg.name]}
                    onChange={handleChange}
                  />
                ))}

                {inputConfigs.map((cfg) => (
                  <InputField
                    key={cfg.id}
                    {...cfg}
                    value={input[cfg.name]}
                    error={inputError[cfg.name]}
                    onChange={handleChange}
                  />
                ))}

                <Button
                  type="submit"
                  bg={"orange.300"}
                  color={"white"}
                  _hover={{ bg: "orange.400" }}
                  onClick={() => window.scrollTo(0, 0)}
                  isLoading={isSubmitting} // <-- Chakra Button spinner
                  loadingText={isUpdating ? "Actualizando..." : "Publicando..."} // texto durante carga
                  spinnerPlacement="start"
                  disabled={isSubmitting} // evita doble click
                >
                  {isUpdating ? "Actualizar" : "Publicar"}
                </Button>
              </Stack>
            </Box>

            <Button
              leftIcon={<Icon as={MdArrowBackIosNew} />}
              onClick={() => {
                navigate(`/account/myPets?page=${pageParam}`);
              }}
              bg="base.green.100"
              color={"grey"}
              _hover={{
                color: "orange.400",
              }}
              disabled={isSubmitting} // no permitir navegar mientras se envía
            >
              Atrás
            </Button>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
}
