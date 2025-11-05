import React from "react";
import { FormControl, Input, Text } from "@chakra-ui/react";

export const inputConfigs = [
    {
      id: "name",
      name: "name",
      label: "Nombre/Apodo (opcional)",
      placeholder: ""
    },
    {
      id: "street",
      name: "street",
      label: "Calles",
      placeholder: "Ej: Calle Diamante",
    },
    {
      id: "number",
      name: "number",
      label: "Altura (opcional)",
      placeholder: "Ej: 1234",
      type: "number",
    },
  ];

export function InputField({
  id,
  name,
  value,
  label,
  type,
  placeholder,
  onChange,
  error,
}) {
  return (
    <FormControl id={id}>
      <Text fontSize="md" fontWeight={600}>{label}</Text>
      <Input
        value={value}
        fontFamily={"body"}
        name={name}
        variant="flushed"
        focusBorderColor={"brand.green.300"}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
        isRequired
      />
      {error && <Text color="red.500" fontSize="sm">{error}</Text>}
    </FormControl>
  );
}
