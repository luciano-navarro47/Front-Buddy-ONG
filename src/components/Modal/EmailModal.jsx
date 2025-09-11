// components/common/modal/EmailModal.jsx
import React, { useEffect, useState } from "react";
import {
  Input,
  Button,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  VStack,
  HStack,
} from "@chakra-ui/react";
import ReusableModal from "./ReusableModal";

export default function EmailModal({ isOpen, onClose, onSave, title = "Falta tu email" }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (isOpen) {
      setError("");
      setEmail("");
    }
  }, [isOpen]);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleSave = () => {
    if (!validateEmail(email)) {
      setError("Por favor, ingresá un email válido.");
      return;
    }
    setError("");
    toast({
      title: "Email guardado.",
      description: "Gracias, estamos iniciando sesión...",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    if (typeof onSave === "function") onSave(email);
    onClose();
  };

  const handleCancel = () => {
    setError("");
    onClose();
  };

  return (
    <ReusableModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <HStack justify="flex-end" w="100%">
          <Button variant="ghost" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button colorScheme="blue" onClick={handleSave} isDisabled={!email || !!error}>
            Continuar
          </Button>
        </HStack>
      }
    >
      <VStack align="stretch" spacing={4}>
        <Text>
          No pudimos obtener tu email desde Microsoft. Por favor, ingresalo manualmente para continuar.
        </Text>

        <FormControl isInvalid={!!error}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError("");
            }}
            placeholder="ejemplo@outlook.com"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
            }}
            autoFocus
          />
          <FormErrorMessage>{error}</FormErrorMessage>
        </FormControl>
      </VStack>
    </ReusableModal>
  );
}
