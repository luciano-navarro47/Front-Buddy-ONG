import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    Input,
    Button,
    Text,
    FormControl,
    FormLabel,
    FormErrorMessage,
    useToast,
} from "@chakra-ui/react";
import { useState } from "react";

const EmailFallbackModal = ({ isOpen, onClose, onSave }) => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const toast = useToast();

    const validateEmail = (email) => /^[^\@]+@[^\s@`]+\.[^\s@]+$/.test(email);

    const handleSave = () => {
        if (!validateEmail(email)) {
            setError("Por favor, ingresá un email válido.")
            return;
        }
        setError("");
        toast({
            title: "Email guardado.",
            description: "Gracias, estamos iniciando sesión...",
            status: "success",
            duration: 3000,
            isClosable: true,
        })
        onSave(email);
        onClose();
    }

    return (
        <Modal isOpen={isOpen} onClose={() => {}}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Falta tu email</ModalHeader>
                <ModalCloseButton isDisabled />
                <ModalBody>
                    <Text mb="1rem">
                        No pudimos obtener tu email desde Microsoft. Por favor, ingresalo manualmente para continuar.
                    </Text>

                    <FormControl isInvalid={!!error}>
                        <FormLabel>Email</FormLabel>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="ejemplo@outlook.com"
                        />
                        <FormErrorMessage>{error}</FormErrorMessage>
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" onClick={handleSave}>
                        Continuar
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    )
}

export default EmailFallbackModal;