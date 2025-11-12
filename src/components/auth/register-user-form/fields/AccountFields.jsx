import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { BiHide, BiShow } from "react-icons/bi";

export default function AccountFields({
  input,
  inputError,
  usernameError,
  handleChange,
  showPassword,
  setShowPassword,
  isUsernameAvailable,
  isCheckingUsername,
}) {
  return (
    <>
      <FormControl id="username" isRequired>
        <FormLabel mb={"0.25rem"}>Nombre de usuario:</FormLabel>
        <Input
          name="username"
          value={input.username}
          onChange={handleChange}
          autoComplete="off"
          focusBorderColor="brand.green.300"
          bg={"white"}
        />
        {inputError.username ? (
          <Text className="text_inputError" color={"red.500"}>
            {inputError.username}
          </Text>
        ) : isCheckingUsername ? (
          <Text fontSize="sm" mt={2}>
            Verificando disponibilidad...
          </Text>
        ) : isUsernameAvailable === false ? (
          <Text
            color="red.500"
            fontSize="sm"
            display="flex"
            alignItems="center"
            mt={2}
          >
            <MdCancel style={{ marginRight: 6 }} /> Apodo no disponible
          </Text>
        ) : isUsernameAvailable === true ? (
          <Text
            color="green.500"
            fontSize="sm"
            display="flex"
            alignItems="center"
            mt={2}
          >
            <MdCheckCircle style={{ marginRight: 6 }} /> Usuario disponible
          </Text>
        ) : null}
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel mb={"0.25rem"}>Correo electrónico:</FormLabel>
        <Input
          name="email"
          value={input.email}
          onChange={handleChange}
          autoComplete="email"
          focusBorderColor="brand.green.300"
          bg={"white"}
        />
        {inputError.email && (
          <Text className="text_inputError" color={"red.500"}>
            {inputError.email}
          </Text>
        )}
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel mb={"0.25rem"}>Contraseña:</FormLabel>
        <InputGroup size="md">
          <Input
            autoComplete="off"
            name="password"
            type={showPassword ? "text" : "password"}
            value={input.password}
            onChange={handleChange}
            focusBorderColor="brand.green.300"
            bg={"white"}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              color={"gray.500"}
              bg={"white"}
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <BiHide size={20} /> : <BiShow size={20} />}
            </Button>
          </InputRightElement>
        </InputGroup>
        {inputError.password && (
          <Text className="text_inputError" color={"red.500"}>
            {inputError.password}
          </Text>
        )}
      </FormControl>
    </>
  );
}
