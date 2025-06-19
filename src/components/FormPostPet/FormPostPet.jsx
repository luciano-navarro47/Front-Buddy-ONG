import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPetDetails, postOrUpdatePet } from "../../redux/Actions/petActions";
import { MdArrowBackIosNew } from "react-icons/md";
import { ErrorForm, SuccedForm } from "./AlertForm/AlertForm";
import "./FormPostPet.css";
import {
  Flex,
  Box,
  //   FormControl,
  //   Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  Icon,
  Select,
} from "@chakra-ui/react";
import { SelectField, selectConfigs } from "./FormFields/SelectField";
import { InputField, inputConfigs } from "./FormFields/InputField";
import { validateForm } from "utils/formValidations/postOrUpdatePetForm";
import { resetForm } from "utils/formUtils";

export default function FormPostPet({ value }) {
  const dispatch = useDispatch();
  const [isIncomplete, setIsIncomplete] = useState(false);
  const [infoSend, setInfoSend] = useState(false);
  const [inputError, setInputError] = useState({});
  const paramsId = useParams().id;
  const petData = useSelector((state) => state.root.petDetails);

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

  const [input, setInput] = useState(initialInputState);

//   const selectConfigs = [
//     {
//       id: "specie",
//       name: "specie",
//       label: "Especie",
//       options: [
//         { value: "gato", label: "Gato/a" },
//         { value: "perro", label: "Perro/a" },
//       ],
//       isRequired: true,
//     },
//     {
//       id: "sex",
//       name: "sex",
//       label: "Sexo",
//       options: [
//         { value: "macho", label: "Macho" },
//         { value: "hembra", label: "Hembra" },
//       ],
//       isRequired: true,
//     },
//     {
//       id: "age",
//       name: "age",
//       label: "Edad",
//       options: [
//         { value: "cachorro", label: "Cachorro/a" },
//         { value: "joven", label: "Joven" },
//         { value: "adulto", label: "Adulto/a" },
//       ],
//       isRequired: true,
//     },
//     {
//       id: "size",
//       name: "size",
//       label: "Tamaño",
//       options: [
//         { value: "pequeño", label: "Pequeño/a" },
//         { value: "mediano", label: "Mediano/a" },
//         { value: "grande", label: "Grande" },
//       ],
//       isRequired: true,
//     },
//     {
//       id: "status",
//       name: "status",
//       label: "Estado",
//       options: [
//         { value: "perdido", label: "Perdido/a" },
//         { value: "encontrado", label: "Encontrado/a" },
//       ],
//       isRequired: true,
//     },
//   ];

//   const inputConfigs = [
//     {
//       id: "area",
//       name: "area",
//       label: "Área",
//       placeholder: "Lugar donde se encuentra...",
//     },
//     {
//       id: "detail",
//       name: "detail",
//       label: "Detalles",
//       placeholder: "Descripción del animal",
//     },
//     {
//       id: "img",
//       name: "img",
//       label: "Imagen",
//       placeholder: "EJ: https://urlDeLaImagen.jpg",
//     },
//   ];
  function completePetData() {
    if (petData) {
      setInput({
        specie: petData.specie || "",
        sex: petData.sex || "",
        age: petData.age || "",
        size: petData.size || "",
        status: petData.status || "",
        area: petData.area || "",
        detail: petData.detail || "",
        img: petData.img || "",
      });
    }
  }
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
    if (value === undefined) {
      dispatch(postOrUpdatePet(input, value));
      setIsIncomplete(false);
      setInfoSend(true);
      resetForm(setInput, setInputError, initialInputState);
    } else {
      dispatch(postOrUpdatePet(input, value, paramsId.id));
      setIsIncomplete(false);
      setInfoSend(true);
      resetForm(setInput, setInputError, initialInputState);
    }
  };

  useEffect(() => {
    if (paramsId) {
      dispatch(getPetDetails(paramsId));
    }
  }, [dispatch, paramsId]);

  useEffect(() => {
    if (value === "update") {
      completePetData();
    } else {
      resetForm(setInput, setInputError, initialInputState);
    }
  }, [petData, value]);

  return (
    <Box>
      {isIncomplete ? <ErrorForm /> : null}
      {infoSend ? <SuccedForm /> : null}
      <form onSubmit={(e) => handlerSubmit(e)} id="myForm">
        <Flex
          minH={"100vh"}
          align={"center"}
          justify={"center"}
          bg="brand.green.200"
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              {value === "update" ? (
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Edita tu mascota
                </Heading>
              ) : (
                <Heading fontSize={"4xl"} textAlign={"center"}>
                  Registra tu mascota
                </Heading>
              )}
              <Text fontSize={"lg"} color={"gray.600"}>
                Gracias por cuidar a los animales ✌️
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

				{selectConfigs.slice(2).map(cfg => (
					<SelectField 
						key={cfg.id}
						{...cfg}
						value={input[cfg.name]}
						error={inputError[cfg.name]}
						onChange={handlerChange}
					/>
				))}

				{inputConfigs.map(cfg => (
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
                    {value === "update" ? "Modificar" : "Publicar"}
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
