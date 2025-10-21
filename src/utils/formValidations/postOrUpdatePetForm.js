export const validateForm = (input = {}) => {
  const inputError = {};

  
  // Normalizar para evitar undefined
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
  
  // console.log("DET: ", typeof detail)
  // console.log("SEX: ", sex)
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

  // detail: primero comprobar vacío, luego longitudes
  if (detail.trim() === "") {
    inputError.detail = "Falta una descripción";
  } else {
    if (detail.trim().length < 50) {
      inputError.detail = "Insertá al menos 50 caractéres que describan al animal";
    } else if (detail.trim().length > 500) {
      inputError.detail = "Máximo de carácteres alcanzado";
    }
  }

  if (images.length < 3) {
    inputError.images = "Debes añadir 3 imágenes";
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

  // VALIDACIÓN DE ALTURA: debe ser entre 2 y 5 dígitos
  if (number.length === 0) {
    inputError.number = "Ingresá la altura";
  } else {
    if (!/^\d+$/.test(number)) {
      inputError.number = "La altura solo debe contener números";
    } else if (number.length < 2) {
      inputError.number = "La altura debe tener al menos 2 dígitos";
    } else if (number.length > 5) {
      inputError.number = "La altura puede tener como máximo 5 dígitos";
    }
  }

  return inputError;
};
