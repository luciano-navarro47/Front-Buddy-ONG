import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdArrowBackIosNew } from "react-icons/md";
import { ErrorForm, SuccedForm } from "./AlertForm/AlertForm";
import "./FormPostPet.css";
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
import { useDispatch } from "react-redux";
import { postOrUpdatePet } from "../../redux/Actions/petActions";
import { SelectField, selectConfigs } from "./FormFields/SelectField";
import { InputField, inputConfigs } from "./FormFields/InputField";
import { validateForm } from "utils/formValidations/postOrUpdatePetForm";
import { resetForm } from "utils/formUtils";
import { usePetForm } from "utils/hooks/usePetForm";

export default function FormPostPet({ isUpdating }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  // Hook
  usePetForm(paramsId, initialInputState, setInput, isUpdating);
  const handlerChange = (e) => {
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
  const handlerSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm(input);
    setInputError(errors);

    if (Object.keys(errors).length) {
      setIsIncomplete(true);
      setInfoSend(false);
      return;
    }
    if (isUpdating !== "update") {
      dispatch(postOrUpdatePet(input));
      setIsIncomplete(false);
      setInfoSend(true);
      resetForm(setInput, setInputError, initialInputState);
      navigate("/myPets");
    } else {
      dispatch(postOrUpdatePet(input, isUpdating, paramsId.id));
      setIsIncomplete(false);
      setInfoSend(true);
      resetForm(setInput, setInputError, initialInputState);
    }
  };

  return (
    <Box>
      {isIncomplete ? <ErrorForm /> : null}
      {infoSend ? <SuccedForm /> : null}
      <form onSubmit={(e) => handlerSubmit(e)} id="myForm">
        <Flex
          minH={"100%"}
          align={"center"}
          justify={"center"}
        //   bg="brand.green.200"
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                {isUpdating === "update"
                  ? "Editá la mascota"
                  : "Registrar mascota"}
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
                      onChange={handlerChange}
                    />
                  ))}
                </HStack>

                {selectConfigs.slice(2).map((cfg) => (
                  <SelectField
                    key={cfg.id}
                    {...cfg}
                    value={input[cfg.name]}
                    error={inputError[cfg.name]}
                    onChange={handlerChange}
                  />
                ))}

                {inputConfigs.map((cfg) => (
                  <InputField
                    key={cfg.id}
                    {...cfg}
                    value={input[cfg.name]}
                    error={inputError[cfg.name]}
                    onChange={handlerChange}
                  />
                ))}

                <Button
                  onClick={(e) => [handlerSubmit(e), window.scrollTo(0, 0)]}
                  loadingText="Post or Edit"
                  fontFamily={"body"}
                  size="lg"
                  bg={"orange.300"}
                  color={"white"}
                  _hover={{
                    bg: "orange.400",
                  }}
                >
                  {isUpdating === "update" ? "Modificar" : "Publicar"}
                </Button>
              </Stack>
            </Box>
            <Link to={"/"}>
              <Icon
                as={MdArrowBackIosNew}
                color="orange.400"
                boxSize={5}
                _hover={{
                  color: "grey",
                  boxSize: "7",
                }}
              />
              <Button
                fontFamily={"body"}
                bg="base.green.100"
                color={"grey"}
                _hover={{
                  color: "orange.400",
                }}
                p="0"
                mr="1rem"
              >
                Atrás
              </Button>
            </Link>
          </Stack>
        </Flex>
      </form>
    </Box>
  );
}
