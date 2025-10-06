import React from "react";
import { FormControl, FormLabel, Input, InputGroup, InputLeftAddon, Text } from "@chakra-ui/react";

export default function ContactField({ input, inputError, handleChange }) {
  return (
    <FormControl id="phone" isRequired>
      <FormLabel>Cel/Teléfono:</FormLabel>
      <InputGroup size="sm">
        <InputLeftAddon bg="gray.50" color="gray.500" fontWeight="bold">
          +54
        </InputLeftAddon>
        <Input
          type="number"
          name="phone"
          value={input.phone}
          onChange={handleChange}
          focusBorderColor="brand.green.300"
        />
      </InputGroup>
      {inputError.phone && <Text className="text_inputError">{inputError.phone}</Text>}
    </FormControl>
  );
}
