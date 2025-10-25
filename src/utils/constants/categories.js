export const CATEGORIES = [
  { value: "clothing", label: "Ropa" },
  { value: "toys", label: "Juguetes" },
  { value: "food", label: "Comida" },
  { value: "accessories", label: "Accesorios" },
  { value: "beds", label: "Camas" },
  { value: "hygiene", label: "Higiene" },
  { value: "healthcare", label: "Salud" },
  { value: "bowls", label: "Platos" },
  { value: "carriers", label: "Transportadoras" },
  { value: "litter", label: "Piedritas" },
  { value: "other", label: "Otros" },
];

export const CATEGORY_LABEL_BY_VALUE = CATEGORIES.reduce((acc, c) => {
  acc[c.value] = c.label;
  return acc;
}, {});
