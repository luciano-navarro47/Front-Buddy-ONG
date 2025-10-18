import React from "react";
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export default function PersonalInfoFields({
  input,
  inputError,
  handleChange,
}) {
  return (
    <>
      <FormControl id="first_name" isRequired>
        <FormLabel mb={"0.25rem"}>Nombre:</FormLabel>
        <Input
          autoComplete="off"
          type="text"
          name="first_name"
          value={input.first_name}
          onChange={handleChange}
          focusBorderColor="brand.green.300"
          bg={"white"}
        />
        {inputError.first_name && (
          <Text className="text_inputError" color={"red.500"}>
            {inputError.first_name}
          </Text>
        )}
      </FormControl>

      <FormControl id="last_name" isRequired>
        <FormLabel mb={"0.25rem"}>Apellido:</FormLabel>
        <Input
          autoComplete="off"
          name="last_name"
          type="text"
          value={input.last_name}
          onChange={handleChange}
          focusBorderColor="brand.green.300"
          bg={"white"}
        />
        {inputError.last_name && (
          <Text className="text_inputError" color={"red.500"}>
            {inputError.last_name}
          </Text>
        )}
      </FormControl>
    </>
  );
}
