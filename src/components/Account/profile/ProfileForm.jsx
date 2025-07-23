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
import { FaPray } from "react-icons/fa";

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
  const canSave = !requiresPasswordChange ? true : (isCurrentValid === true && !isSamePassword);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((form) => ({ ...form, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      first_name: form.first_name,
      last_name: form.last_name,
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

  return (
    <Box maxW="600px" mx="auto" p="6" bg="white" shadow="md">
      <VStack spacing="6">
        <Avatar
          size="2xl"
          name={`${form.first_name} ${form.last_name}`}
          src={userInfo.avatarUrl}
        />

        <Heading size="lg">Mi Perfil</Heading>

        <Box as="form" w="100%" onSubmit={handleSubmit}>
          <Stack spacing="4">
            <HStack spacing="4">
              <FormControl id="first_name">
                <FormLabel>Nombre</FormLabel>
                <Input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="last_name">
                <FormLabel>Apellido</FormLabel>
                <Input
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="username">
                <FormLabel>Nombre de usuario</FormLabel>
                <Input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            <FormControl id="email">
              <FormLabel>Correo electrónico</FormLabel>
              <Input name="email" value={form.email} onChange={handleChange} />
            </FormControl>

            <FormControl id="phone">
              <FormLabel>Teléfono</FormLabel>
              <Input name="phone" value={form.phone} onChange={handleChange} />
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
                <Text>La nueva contraseña debe ser distinta de la actual</Text>
              )}
            </FormControl>

            <Button
              type="submit"
              colorScheme="blue"
              w="full"
              isDisabled={!canSave}
            >
              Guardar
            </Button>
          </Stack>
        </Box>
      </VStack>
    </Box>
  );
}
