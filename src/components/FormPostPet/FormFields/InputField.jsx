import React from "react";
import { FormControl, Input, Text } from "@chakra-ui/react";

export const inputConfigs = [
    {
      id: "area",
      name: "area",
      label: "Área",
      placeholder: "Lugar donde se encuentra...",
    },
    {
      id: "detail",
      name: "detail",
      label: "Detalles",
      placeholder: "Descripción del animal",
    },
    {
      id: "img",
      name: "img",
      label: "Imagen",
      placeholder: "EJ: https://urlDeLaImagen.jpg",
    },
  ];

export function InputField({
  id,
  name,
  value,
  label,
  placeholder,
  onChange,
  error,
}) {
  return (
    <FormControl id={id}>
      <Text fontSize="sm">{label}</Text>
      <Input
        value={value}
        fontFamily={"body"}
        name={name}
        variant="flushed"
        focusBorderColor={"brand.green.300"}
        placeholder={placeholder}
        onChange={onChange}
      />
      {error && <Text color="red.500" fontSize="sm">{error}</Text>}
    </FormControl>
  );
}
