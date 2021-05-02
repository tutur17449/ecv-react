const requiredFields = ["nom", "image", "description", "prix", "categorie_id"];

const validateFields = (name, value) => {
  if (requiredFields.includes(name) && value.length === 0) {
    return "Ce champ est requis";
  }

  if (name === "prix" && value <= 0) {
    return "Le prix doit être supérieur à 0 euros";
  }

  return "";
};

export default validateFields;
