
export const validateForm = (input) => {
    let inputError = {};
  
    if (input.specie === "" || !input.specie.length) {
      inputError.specie = "Selecciona gato o perro";
    }
    if (input.sex === "" || !input.sex.length) {
      inputError.sex = `Selecciona macho o hembra`;
    }
    if (input.age === "" || !input.age.length) {
      inputError.age = "Edad aproximada de la mascota";
    }
    if (input.size === "" || !input.size.length) {
      inputError.size = "Selecciona un tamaño aproximado";
    }
    if (input.status === "" || !input.status.length) {
      inputError.status = "Selecciona un estado";
    }
    if (input.area.trim() === "" || !input.area.length) {
      inputError.area = "Provee una localidad";
    }
    if (input.detail.trim()) {
      if (input.detail.trim().length < 15) {
        inputError.detail = "Inserta al menos 16 caractéres";
      }
    } else {
      inputError.detail = "Brinda una breve descripcion de la mascota";
    }
    if (input.img === "") {
      inputError.img = "Inserta el link de una imagen";
    }
    return inputError;
  };