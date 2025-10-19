import React from "react";
import { FormControl, Select, Text } from "@chakra-ui/react";

export const selectConfigs = [
    {
      id: "specie",
      name: "specie",
      label: "Especie",
      options: [
        { value: "gato", label: "Gato/a" },
        { value: "perro", label: "Perro/a" },
      ],
      isRequired: true,
    },
    {
      id: "sex",
      name: "sex",
      label: "Sexo",
      options: [
        { value: "macho", label: "Macho" },
        { value: "hembra", label: "Hembra" },
      ],
      isRequired: true,
    },
    {
      id: "age",
      name: "age",
      label: "Edad",
      options: [
        { value: "cachorro", label: "Cachorro/a" },
        { value: "joven", label: "Joven" },
        { value: "adulto", label: "Adulto/a" },
      ],
      isRequired: true,
    },
    {
      id: "size",
      name: "size",
      label: "Tamaño",
      options: [
        { value: "pequeño", label: "Pequeño/a" },
        { value: "mediano", label: "Mediano/a" },
        { value: "grande", label: "Grande" },
      ],
      isRequired: true,
    },
    {
      id: "status",
      name: "status",
      label: "Estado",
      options: [
        { value: "perdido", label: "Perdido/a" },
        { value: "encontrado", label: "Encontrado/a" },
      ],
      isRequired: true,
    },
  ];
export function SelectField({
  id,
  name,
  label,
  options,
  value,
  error,
  onChange,
  isRequired,
}) {
  return (
    <FormControl id={id} isRequired={isRequired}>
      <Select
        focusBorderColor={"brand.green.300"}
        fontFamily={"body"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>
      {error && <Text color="red.500" fontSize="sm">{error}</Text>}
    </FormControl>
  );
}
