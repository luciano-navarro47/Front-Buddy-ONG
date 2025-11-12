let isEmail = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
export const USERNAME_REGEX = /^[A-Za-z0-9_]+$/;

export const validateRegisterUserForm = (input) => {
  let inputError = {};

  const first_name = input.first_name || "";
  const last_name = input.last_name || "";
  const email = input.email || "";
  const username = input.username || "";
  const phone = input.phone || "";

  if (first_name === "" || first_name.length === 0) {
    inputError.first_name = "Debes ingresar tu nombre";
  }
  if (last_name === "" || last_name.length === 0) {
    inputError.last_name = "Debes ingresar tu apellido";
  }
  if (email === "" || email.length === 0) {
    inputError.email = "Debes ingresar tu e-mail";
  } else if (!isEmail.test(email)) {
    inputError.email = "Ingresa un formato de e-mail válido";
  }
  if (!username) {
    inputError.username = "Debes ingresar un nombre de usuario.";
  } else if (username.length < 3 || username.length > 10) {
    inputError.username = "Ingresá entre 3 y 10 caracteres";
  } else if (!USERNAME_REGEX.test(username)) {
    inputError.username = "Solo se permiten letras, números y guiones bajos";
  }
  if (phone !== "" && phone.length !== 10) {
    inputError.phone = "Debe ser un número de 10 dígitos";
  }
  return inputError;
};
