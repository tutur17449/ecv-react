const requiredFields = ["email", "password", "prenom", "nom", "image"];

const validateFields = (name, value) => {
  if (requiredFields.includes(name) && value.length === 0) {
    return "Ce champ est requis";
  }

  return "";
};

export default validateFields;
