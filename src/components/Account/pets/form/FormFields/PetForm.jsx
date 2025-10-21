import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  SimpleGrid,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  getPetsByUser,
  postOrUpdatePet,
} from "../../../../../redux/Actions/petActions";
import { SelectField, selectConfigs } from "../FormFields/SelectField";
import { InputField, inputConfigs } from "../FormFields/InputField";
import { validateForm } from "utils/formValidations/postOrUpdatePetForm";
import { resetForm } from "utils/formValidations/profileForm";
import { usePetForm } from "utils/hooks/pet/usePetForm";
import UploadImages from "components/account/common/UploadImages";
import DescriptionEditor from "components/account/common/DescriptionEditor.tsx";
import CitySelect from "components/commons/CitySelect";

/**
 * Props:
 * - mode: "create" | "update"  (compatibilidad con MyPetsList)
 * - isUpdating: (opcional) id or truthy when updating (mantengo compatibilidad con la versión previa)
 * - userRole
 * - onSuccess: callback (opcional) -> ideal si el formulario está dentro de un modal
 * - onCancel: callback (opcional)
 */
export default function PetForm({
  mode = "create",
  isUpdating = false,
  userRole,
  onSuccess,
  onCancel,
}) {
  // TO DO: use the userRole to delimite the user permission
  // to only read the information and not create a pet if is user. Use toast to show alert

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const pageParam = parseInt(searchParams.get("page")) || 1;
  const paramsId = useParams().id;

  const isUpdateMode = mode === "update" || Boolean(isUpdating);

  const initialInputState = {
    name: "",
    specie: "",
    sex: "",
    age: "",
    size: "",
    postType: "",
    detail: "",
    city: "",
    street: "",
    number: "",
    images: [],
    videos: [],
  };

  const [isIncomplete, setIsIncomplete] = useState(false);
  const [infoSend, setInfoSend] = useState(false);
  const [inputError, setInputError] = useState({});
  const [input, setInput] = useState(initialInputState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState([]);
  const [loadingPet, setLoadingPet] = useState(isUpdateMode);

  usePetForm(paramsId, initialInputState, setInput, isUpdateMode);

  useEffect(() => {
    if (isUpdateMode && input?.images) {
      setImages(Array.isArray(input.images) ? input.images : []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdateMode]);

  useEffect(() => {
    setInput((prev) => ({ ...prev, images }));
  }, [images]);

  const handleChange = (e) => {
    // e.preventDefault();
    const { name, value } = e.target;

    if (name === "number") {
      if (value === "") {
        setInput((prev) => ({ ...prev, [name]: value }));
      } else {
        if (!/^\d+$/.test(value)) return;
        if (value.length > 5) return;
        setInput((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setInput((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

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

    if (!input.images || input.images.length === 0) {
      setIsIncomplete(true);
      toast({
        title: "Faltan imágenes",
        status: "warning",
        description: "Subí al menos una imagen de la mascota.",
        duration: 2500,
        isClosable: true,
      });
      return;
    }

    setIsIncomplete(false);
    setInfoSend(false);
    setIsSubmitting(true);

    try {
      window.scrollTo(0, 0);

      if (!isUpdateMode) {
        // create
        await dispatch(postOrUpdatePet(input));
      } else {
        const updateArg = isUpdating || "update";
        await dispatch(postOrUpdatePet(input, updateArg, paramsId));
      }

      const loggedUser = JSON.parse(localStorage.getItem("loggedUser"));
      if (loggedUser?.id) {
        await dispatch(getPetsByUser(loggedUser.id));
      }

      toast({
        title: isUpdateMode ? "Mascota actualizada" : "Mascota publicada",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      resetForm(setInput, setInputError, initialInputState);
      setImages([]);
      setInfoSend(true);
      setIsSubmitting(false);

      if (onSuccess) {
        onSuccess();
      } else {
        navigate(`/account/myPets?page=${pageParam}`);
      }
    } catch (error) {
      console.error("Error enviando mascota:", error);
      toast({
        title: "Error",
        status: "error",
        description: "Ocurrió un error al enviar la mascota.",
        duration: 2500,
        isClosable: true,
      });
      setInfoSend(false);
      setIsSubmitting(false);
    }
  };

  if (isUpdateMode && loadingPet) {
    return (
      <Box p={6} textAlign="center">
        <Spinner />
      </Box>
    );
  }

  return (
    <Flex minH={"100%"} align={"center"} justify={"center"}>
      <Stack
        spacing={6}
        mx={"auto"}
        maxW={"1100px"}
        w="100%"
        py={6}
        px={{ base: 4, md: 6 }}
      >
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {selectConfigs.map((cfg) => (
            <SelectField
              key={cfg.id}
              {...cfg}
              value={input[cfg.name]}
              error={inputError[cfg.name]}
              onChange={handleChange}
              w="100%"
            />
          ))}
          <CitySelect
            name="city"
            value={input.city}
            onChange={handleChange}
            error={inputError.city}
          />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {inputConfigs.map((cfg) => (
            <InputField
              key={cfg.id}
              {...cfg}
              value={input[cfg.name]}
              error={inputError[cfg.name]}
              onChange={handleChange}
              type={cfg.type}
              w="100%"
            />
          ))}
        </SimpleGrid>

        <FormControl id="detail">
          <FormLabel fontSize="md" fontWeight={600}>
            Detalles / Descripción
          </FormLabel>
          <Box>
            <DescriptionEditor
              value={input.detail}
              onChange={(val) => setInput((p) => ({ ...p, detail: val }))}
              placeholder="Contá algo sobre la mascota (carácter, circunstancias, cuidados)"
              error={inputError.detail}
            />
          </Box>
        </FormControl>

        <FormControl id="images" isRequired>
          <FormLabel fontSize="md" fontWeight={600}>
            Cargar imágenes de la mascota
          </FormLabel>
          <UploadImages
            setImages={(urls) => setImages(Array.isArray(urls) ? urls : [])}
            multiple
            error={inputError.images}
          />
        </FormControl>

        {/* buttons */}
        <Stack spacing={4} direction="row" justify="flex-end">
          {onCancel && (
            <Button
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
          )}
          <Button
            type="submit"
            colorScheme="orange"
            onClick={(e) => handlerSubmit(e)}
            isLoading={isSubmitting}
            loadingText={isUpdateMode ? "Actualizando..." : "Publicando..."}
            spinnerPlacement="start"
            disabled={isSubmitting}
          >
            {isUpdateMode ? "Actualizar" : "Publicar"}
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
}
