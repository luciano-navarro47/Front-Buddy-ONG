import { useEffect, useState, useRef } from "react";
import {
  Box,
  Avatar,
  Heading,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Stack,
  VStack,
  HStack,
  Text,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUser,
  getUserById,
  checkUserPassword,
} from "redux/Actions/userActions";
import { validateRequiredFields, validateFieldPatterns } from "utils/formUtils";

export default function ProfileForm({ user }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const userInfo = useSelector((s) => s.user);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({});
  const requiredFields = [
    "first_name",
    "last_name",
    "username",
    "email",
    "phone",
  ];

  const [isSamePassword, setIsSamePassword] = useState(false);

  const [isCurrentValid, setIsCurrentValid] = useState(null);
  const [checking, setChecking] = useState(false);
  const debounceRef = useRef(null);

  const [showActualPass, setShowActualPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const validateCurrentPassword = async (password) => {
    if (!password) {
      setIsCurrentValid(null);
      return;
    }
    setChecking(true);
    try {
      const isCorrect = await dispatch(checkUserPassword(user?.id, password));

      setIsCurrentValid(isCorrect);
    } catch (error) {
      setIsCurrentValid(false);
    } finally {
      setChecking(false);
    }
  };

  const handleCurrentChange = (e) => {
    const password = e.target.value;
    setForm((form) => ({ ...form, currentPassword: password }));

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      validateCurrentPassword(password);
    }, 500);
  };

  const requiresPasswordChange = form.newPassword.length > 0;
  const canSave = !requiresPasswordChange
    ? true
    : isCurrentValid === true && !isSamePassword;

  const isFormValid = Object.keys(errors).length === 0;
  const canSaveFinal = isFormValid && canSave;

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };

    setForm(updatedForm);

    const validationErrors = validateRequiredFields(
      updatedForm,
      requiredFields
    );
    const patternErrors = validateFieldPatterns(updatedForm);

    setErrors({ ...validationErrors, ...patternErrors });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
      username: form.username,
      email: form.email,
      phone: form.phone,
      newPassword: form.newPassword,
    };

    if (form.newPassword) {
      payload.password = form.newPassword;
      payload.currentPassword = form.currentPassword;
    }

    if (!payload.password) {
      delete payload.password;
    }

    dispatch(updateUser(userInfo.id, payload));
    toast({ status: "success", title: "Perfil actualizado" });
    setForm((form) => ({ ...form, currentPassword: "", newPassword: "" }));
    setIsCurrentValid(null);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    if (user?.id) dispatch(getUserById(user.id));
  }, [dispatch, user?.id]);

  useEffect(() => {
    if (userInfo.id) {
      setForm({
        first_name: userInfo.first_name ?? "",
        last_name: userInfo.last_name ?? "",
        username: userInfo.username ?? "",
        email: userInfo.email ?? "",
        phone: userInfo.phone ?? "",
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [userInfo]);

  useEffect(() => {
    if (form.currentPassword && form.newPassword) {
      setIsSamePassword(form.currentPassword === form.newPassword);
    } else {
      setIsSamePassword(false);
    }
  }, [form.currentPassword, form.newPassword]);

  return (
    <Box>
      <Box bg="brand.green.100" p="4" borderRadius="md" mb="6">
        <Heading size="lg">Información Personal</Heading>
        <Text mt="2" color="gray.700">
          Editá tus datos. Nombre de usuario, email, teléfono o contraseña.
        </Text>
      </Box>

      <Box maxW="600px" mx="auto" p="6" bg="white" shadow="md">
        <VStack spacing="6">
          <Avatar
            size="2xl"
            name={`${form.first_name} ${form.last_name}`}
            src={userInfo.avatarUrl}
          />

          <Box as="form" w="100%" onSubmit={handleSubmit}>
            <Stack spacing="4">
              <HStack spacing="4">
                <FormControl id="first_name">
                  <FormLabel>Nombre</FormLabel>
                  <Input
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    isDisabled={true}
                  />
                </FormControl>
                <FormControl id="last_name">
                  <FormLabel>Apellido</FormLabel>
                  <Input
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    isDisabled={true}
                  />
                </FormControl>
                <FormControl id="username" isInvalid={!!errors.username}>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <Input
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                  />
                  {errors.username && (
                    <Text color="red.500" fontSize="sm">
                      {errors.username}
                    </Text>
                  )}
                </FormControl>
              </HStack>

              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Correo electrónico</FormLabel>
                <Input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <Text color="red.500" fontSize="sm">
                    {errors.email}
                  </Text>
                )}
              </FormControl>

              <FormControl id="phone" isInvalid={!!errors.phone}>
                <FormLabel>Teléfono</FormLabel>
                <Input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  // isDisabled={form.phone === "" ? false : true}
                />
                {errors.phone && (
                  <Text color="red.500" fontSize="sm">
                    {errors.phone}
                  </Text>
                )}
              </FormControl>

              <FormControl id="currentPassword">
                <FormLabel>Contraseña actual</FormLabel>
                <InputGroup>
                  <Input
                    name="currentPassword"
                    type={showActualPass ? "text" : "password"}
                    value={form.currentPassword}
                    onChange={handleCurrentChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      size="sm"
                      onClick={() => setShowActualPass((v) => !v)}
                    >
                      {showActualPass ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <HStack spacing="2" mt="1">
                  {checking && <Spinner size="sm" />}
                  {isCurrentValid === true && <CheckIcon color="green.500" />}
                  {isCurrentValid === false && <CloseIcon color="red.500" />}
                  {isCurrentValid === false && (
                    <Text color="red.500" fontSize="sm">
                      Contraseña incorrecta
                    </Text>
                  )}
                  <Text>Ingresá tu contraseña actual para poder cambiarla</Text>
                </HStack>
              </FormControl>

              <FormControl
                id="newPassword"
                isDisabled={!isCurrentValid}
                isInvalid={isSamePassword}
              >
                <FormLabel>Nueva contraseña</FormLabel>
                <InputGroup>
                  <Input
                    name="newPassword"
                    type={showNewPass ? "text" : "password"}
                    value={form.newPassword}
                    onChange={(e) =>
                      setForm((form) => ({
                        ...form,
                        newPassword: e.target.value,
                      }))
                    }
                  />
                  <InputRightElement width="4.5rem">
                    <Button size="sm" onClick={() => setShowNewPass((v) => !v)}>
                      {showNewPass ? "Ocultar" : "Mostrar"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                {isSamePassword && (
                  <Text>
                    La nueva contraseña debe ser distinta de la actual
                  </Text>
                )}
              </FormControl>

              <Button
                type="submit"
                colorScheme="blue"
                w="full"
                isDisabled={!canSaveFinal}
              >
                Guardar
              </Button>
            </Stack>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
}
