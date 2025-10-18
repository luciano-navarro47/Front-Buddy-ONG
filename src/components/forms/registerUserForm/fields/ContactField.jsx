import React from "react";
import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Text } from "@chakra-ui/react";

export default function ContactField({ input, inputError, handleChange }) {
  return (
    <FormControl id="phone" isRequired>
      <FormLabel mb={"0.25rem"}>Cel/Teléfono:</FormLabel>
      <InputGroup size="sm" >
        <InputLeftAddon borderRadius={10}  color="gray.500" fontWeight="bold">
          +54
        </InputLeftAddon>
        <Input
          type="number"
          name="phone"
          value={input.phone}
          onChange={handleChange}
          borderRadius={10}
          focusBorderColor="brand.green.300"
          bg={"white"}
        />
      </InputGroup>
      {inputError.phone && <Text className="text_inputError" color={"red"}>{inputError.phone}</Text>}
    </FormControl>
  );
}
