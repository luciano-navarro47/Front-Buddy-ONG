import {
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Spinner,
  HStack,
  FormErrorMessage,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

export default function TextField({
  label,
  name,
  value,
  onChange,
  error,
  disabled = false,
  type = "text",
  isPassword = false,
  showPassword,
  toggleShowPassword,
  checking = false,
  isValid = null,
  helpText,
}) {
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <FormControl id={name} isInvalid={Boolean(error)} isDisabled={disabled}>
      <FormLabel>{label}</FormLabel>
      <InputGroup>
        <Input name={name} type={inputType} value={value} onChange={onChange} />
        {isPassword && (
          <InputRightElement width="4.5rem">
            <Button size="sm" onClick={toggleShowPassword} variant="ghost">
              {showPassword ? "Ocultar" : "Mostrar"}
            </Button>
          </InputRightElement>
        )}
      </InputGroup>

      <Box minHeight="35px" mt="1">
        <FormErrorMessage
          fontSize="sm"
          visibility={error ? "visible" : "hidden"}
        >
          {error || "placeholder"}
        </FormErrorMessage>
      </Box>

      {(checking || isValid !== null || helpText) && (
        <HStack>
          {checking && <Spinner size="sm" />}
          {isValid === true && <CheckIcon color="green.500" />}
          {isValid === false && <CloseIcon color="red.500" />}
          {isValid === false && (
            <FormErrorMessage fontSize="sm">
              Contraseña incorrecta
            </FormErrorMessage>
          )}
          {helpText && <Text mt="1">{helpText}</Text>}
        </HStack>
      )}
    </FormControl>
  );
}
