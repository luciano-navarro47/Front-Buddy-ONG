import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Spinner,
  HStack,
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

      {error && (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      )}

      {(checking || isValid !== null || helpText) && (
        <HStack spacing="2" mt="1">
          {checking && <Spinner size="sm" />}
          {isValid === true && <CheckIcon color="green.500" />}
          {isValid === false && <CloseIcon color="red.500" />}
          {isValid === false && (
            <Text color="red.500" fontSize="sm">
              Contraseña incorrecta
            </Text>
          )}
          {helpText && <Text mt="1">{helpText}</Text>}
        </HStack>
      )}
    </FormControl>
  );
}
