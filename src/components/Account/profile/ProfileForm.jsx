import {
  Box,
  Avatar,
  Button,
  Stack,
  VStack,
  HStack,
  useToast,
} from "@chakra-ui/react";
import ProfileHeader from "../common/ProfileHeader";
import TextField from "./TextField";
import PasswordSection from "./PasswordSection";
import { useProfileForm } from "utils/hooks/profile/useProfileForm";

export default function ProfileForm({ user }) {
  const toast = useToast();
  const {
    userInfo,
    form,
    errors,
    canSaveFinal,
    passwordResetTrigger,
    debounceRef,
    setForm,
    handleChange,
    handleSubmit,
    handlePasswordValidationChange,
  } = useProfileForm(user, toast);

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
