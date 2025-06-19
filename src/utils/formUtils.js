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