import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Avatar,
  Heading,
  Button,
  Stack,
  VStack,
  HStack,
  Text,
  useToast,
} from "@chakra-ui/react";
import ProfileHeader from "../common/ProfileHeader";
import TextField from "./TextField";
import PasswordSection from "./PasswordSection";
import { updateUser, getUserById } from "redux/Actions/userActions";
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

  const debounceRef = useRef(null);

  const [isSamePassword, setIsSamePassword] = useState(false);
  const [isCurrentValid, setIsCurrentValid] = useState(null);
  const [passwordResetTrigger, setPasswordResetTrigger] = useState(0);

  const handlePasswordValidationChange = (isValid, isSame) => {
    setIsCurrentValid(isValid);
    setIsSamePassword(isSame);
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
    setPasswordResetTrigger((prev) => prev + 1);
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

  return (
    <Box>
      <ProfileHeader
        title="Información Personal"
        subtitle="Editá tus datos. Nombre de usuario, email, teléfono o contraseña."
      />
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
                <TextField
                  label="Nombre"
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  error={errors.first_name}
                  disabled={true}
                />
                <TextField
                  label="Apellido"
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  error={errors.last_name}
                  disabled={true}
                />
                <TextField
                  label="Nombre de usuario"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  error={errors.username}
                />
              </HStack>
              <HStack>
                <TextField
                  label="Correo electrónico"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
                <TextField
                  label="Teléfono/Celular"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  error={errors.phone}
                />
              </HStack>

              <PasswordSection
                form={form}
                setForm={setForm}
                debounceRef={debounceRef}
                onPasswordValidationChange={handlePasswordValidationChange}
                userId={user?.id}
                resetTrigger={passwordResetTrigger}
              />
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
