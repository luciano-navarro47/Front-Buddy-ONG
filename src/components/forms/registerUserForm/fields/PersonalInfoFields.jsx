import React from "react";
import { Box, FormControl, FormLabel, Input, Text, HStack } from "@chakra-ui/react";

export default function PersonalInfoFields({ input, inputError, handleChange }) {
  return (
    <HStack>
      <Box>
        <FormControl id="first_name" isRequired>
          <FormLabel>Nombre:</FormLabel>
          <Input
            autoComplete="off"
            type="text"
            name="first_name"
            value={input.first_name}
            onChange={handleChange}
            focusBorderColor="brand.green.300"
          />
          {inputError.first_name && (
            <Text className="text_inputError">{inputError.first_name}</Text>
          )}
        </FormControl>

        <FormControl id="last_name" isRequired>
          <FormLabel>Apellido:</FormLabel>
          <Input
            autoComplete="off"
            name="last_name"
            type="text"
            value={input.last_name}
            onChange={handleChange}
            focusBorderColor="brand.green.300"
          />
          {inputError.last_name && (
            <Text className="text_inputError">{inputError.last_name}</Text>
          )}
        </FormControl>
      </Box>
    </HStack>
  );
}
