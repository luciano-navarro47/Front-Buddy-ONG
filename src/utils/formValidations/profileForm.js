/**
 * Resetea un formulario controlado de React:
 *  - Vuelve al estado inicial de los campos (`initialValues`)
 *  - Limpia el objeto de errores
 *
 * @param {Function} setValues  – setState de los valores del form
 * @param {Function} setErrors  – setState del objeto de errores
 * @param {Object}   initialValues – objeto con los valores iniciales
 */

export function resetForm(setValues, setErrors, initialValues) {
  setValues(initialValues);
  setErrors({});
}

/**
 * Valida campos obligatorios de un formulario:
 * @param {Object} values  – Los valores del formulario
 * @param {string[]} requiredFields  – Lista de nombres de campos requeridos
 * @returns {Object} – objeto con errores por campo
 */
export function validateRequiredFields(values, requiredFields) {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!values[field] || values[field].trim() === "") {
      errors[field] = "Este campo es obligatorio";
    }
  });

  return errors;
}

/**
 * Valida campos con expresiones regulares personalizadas.
 *
 * @param {Object} values - Los valores del formulario.
 * @returns {Object} - Objeto con errores por campo.
 */

export function validateFieldPatterns(values) {
  const errors = {};

  const usernameRegex = /^(?=(?:.*\d){2,})[a-zA-Z\d]{5,}$/;
  if (values.username && !usernameRegex.test(values.username)) {
    errors.username =
      "Debe tener al menos 5 caracteres y 2 numeros";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (values.email && !emailRegex.test(values.email)) {
    errors.email = "Correo no válido | Formato: correo@dominio.com";
  }

  const phoneRegex = /^(11|15)\d{8}$/;
  if (values.phone && !phoneRegex.test(values.phone)) {
    errors.phone = "El número debe comenzar con 11 o 15";
  }

  return errors;
}
