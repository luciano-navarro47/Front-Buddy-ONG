export const validateForm = (input = {}) => {
  const inputError = {};

  // Normalize to avoid an undefined value
  const specie = input.specie ?? "";
  const sex = input.sex ?? "";
  const age = input.age ?? "";
  const size = input.size ?? "";
  const postType = input.postType ?? "";
  const detail = (input.detail ?? "").toString();
  const images = Array.isArray(input.images) ? input.images : [];
  const street = (input.street ?? "").toString();
  const name = (input.name ?? "").toString();
  const city = input.city ?? "";
  const number = (input.number ?? "").toString(); // altura

  if (!specie.length) {
    inputError.specie = "Selecciona gato o perro";
  }
  if (!sex.length) {
    inputError.sex = "Selecciona si es macho o hembra";
  }
  if (!age.length) {
    inputError.age = "Edad aproximada del animal";
  }
  if (!size.length) {
    inputError.size = "Selecciona un tamaño aproximado";
  }
  if (!postType.length) {
    inputError.postType = "Selecciona un tipo de publicación";
  }

  if (detail.trim() === "") {
    inputError.detail = "Falta una descripción";
  } else {
    if (detail.trim().length < 50) {
      inputError.detail =
        "Insertá al menos 50 caractéres que describan al animal";
    } else if (detail.trim().length > 500) {
      inputError.detail = "Máximo de carácteres alcanzado";
    }
  }

  if (images.length < 3) {
    inputError.images = "Debes añadir un total de 3 imágenes";
  }

  if (street.trim().length === 0) {
    inputError.street = "Ingresá la/s calle/s";
  } else if (street.trim().length < 3) {
    inputError.street = "Ingresá al menos 3 carácteres";
  }

  if (name.trim().length > 0 && name.trim().length < 3) {
    inputError.name = "Si ingresas un nombre, debe tener al menos 3 letras.";
  }

  if (!city.length) {
    inputError.city = "Ingresá la localidad";
  }

  const numberTrim = number.trim();
  if (numberTrim.length > 0) {
    if (!/^\d+$/.test(numberTrim)) {
      inputError.number = "La altura solo debe contener números";
    } else if (numberTrim.length < 2) {
      inputError.number = "La altura debe tener al menos 2 dígitos";
    } else if (numberTrim.length > 5) {
      inputError.number = "La altura puede tener como máximo 5 dígitos";
    }
  }
  return inputError;
};
