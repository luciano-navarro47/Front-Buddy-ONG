import React from "react";
import { FormControl, Select, Text } from "@chakra-ui/react";

export const selectConfigs = [
  {
    id: "specie",
    name: "specie",
    label: "Tipo de especie",
    options: [
      { value: "cat", label: "Gato" },
      { value: "dog", label: "Perro" },
    ],
    isRequired: true,
  },
  {
    id: "sex",
    name: "sex",
    label: "Sexo",
    options: [
      { value: "male", label: "Macho" },
      { value: "female", label: "Hembra" },
    ],
    isRequired: true,
  },
  {
    id: "age",
    name: "age",
    label: "Edad",
    options: [
      { value: "puppy", label: "Cachorro" },
      { value: "young", label: "Joven" },
      { value: "adult", label: "Adulto" },
    ],
    isRequired: true,
  },
  {
    id: "size",
    name: "size",
    label: "Tamaño aproximado",
    options: [
      { value: "small", label: "Pequeño" },
      { value: "medium", label: "Mediano" },
      { value: "large", label: "Grande" },
    ],
    isRequired: true,
  },
  {
    id: "postType",
    name: "postType",
    label: "Tipo de publicación",
    options: [
      { value: "wanted", label: "Se busca" },
      { value: "abandoned", label: "Está abandonado" },
      { value: "in_adoption", label: "Darlo en adopción" },
    ],
    isRequired: true,
  },
  // {
  //   id: "city",
  //   name: "city",
  //   label: "Ciudad",
  //   // TO DO: options[] MUST MAP AND THIRD-PARTY API THAT FETCH LOCATIONS
  //   // TO DO: options[] MUST MAP AND THIRD-PARTY API THAT FETCH LOCATIONS
  //   options: [ 
  //     { value: "CITY_NAME_1", label: "Ciudad 1" },
  //     { value: "CITY_NAME_2", label: "Ciudad 2" },
  //     { value: "CITY_NAME_3", label: "Ciudad 3" },
  //   ],
  //   isRequired: true,
  // },
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
      {error && (
        <Text color="red.500" fontSize="sm">
          {error}
        </Text>
      )}
    </FormControl>
  );
}
