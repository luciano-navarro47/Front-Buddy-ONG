import React from "react";
import { FormControl, FormLabel, Input, Text, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import { MdCancel, MdCheckCircle } from "react-icons/md";
import { BiHide, BiShow } from "react-icons/bi";


export default function AccountFields({
  input,
  inputError,
  usernameError,
  handleChange,
  showPassword,
  setShowPassword,
}) {
  return (
    <>
      <FormControl id="username" isRequired>
        <FormLabel>Nombre de usuario:</FormLabel>
        <Input
          name="username"
          value={input.username}
          onChange={handleChange}
          autoComplete="off"
          focusBorderColor="brand.green.300"
        />
        {inputError.username ? (
          <Text className="text_inputError">{inputError.username}</Text>
        ) : (
          input.username.length >= 3 &&
          (usernameError ? (
            <Text color="red.500" fontSize="sm" display="flex" alignItems="center" mt={2}>
              <MdCancel /> Usuario no disponible
            </Text>
          ) : (
            <Text color="green.500" fontSize="sm" display="flex" alignItems="center" mt={2}>
              <MdCheckCircle /> Usuario disponible
            </Text>
          ))
        )}
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>E-mail:</FormLabel>
        <Input
          name="email"
          value={input.email}
          onChange={handleChange}
          autoComplete="email"
          focusBorderColor="brand.green.300"
        />
        {inputError.email && <Text className="text_inputError">{inputError.email}</Text>}
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Contraseña:</FormLabel>
        <InputGroup size="md">
          <Input
            autoComplete="off"
            placeholder="Ingresar una contraseña"
            name="password"
            type={showPassword ? "text" : "password"}
            value={input.password}
            onChange={handleChange}
            focusBorderColor="brand.green.300"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <BiHide  size={20}/> : <BiShow size={20}/>}
            </Button>
          </InputRightElement>
        </InputGroup>
        {inputError.password && <Text className="text_inputError">{inputError.password}</Text>}
      </FormControl>
    </>
  );
}
