export const validateLoginForm = (input) => {
    const errors = {};
  
    if (!input.email) {
      errors.email = "Ingresa tu correo electrónico";
    } else if (!/\S+@\S+\.\S+/.test(input.email)) {
      errors.email = "El correo eletrónico no es válido";
    }
  
    if (!input.password) {
      errors.password = "Ingresa tu contraseña";
    }
  
    return errors;
  }