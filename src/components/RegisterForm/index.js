import { useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import formValidator from "../../helpers/formValidator";
import formFieldValidator from "../../helpers/formFieldValidator";
import validateFields from "./formRegister.validator";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FormInput from "../FormInput";

const RegisterForm = () => {
  const { register } = useAuth();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState({
    visible: false,
    message: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    prenom: "",
    nom: "",
    image: "",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
    prenom: "",
    nom: "",
    image: "",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    formFieldValidator(name, value, validateFields, setFormError, formError);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setGlobalError({
      visible: false,
      message: "",
    });
    const validation = formValidator(
      formError,
      setFormError,
      formData,
      validateFields
    );

    if (!validation) {
      setIsLoading(true);
      try {
        await register(formData);
        history.push("/login");
      } catch (err) {
        setGlobalError({
          visible: true,
          message: err?.message ?? "Une erreur est survenue",
        });
        setIsLoading(false);
      }
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="6" className="m-auto pt-5">
          {globalError.visible && (
            <Alert
              color="danger"
              isOpen={globalError.visible}
              toggle={() =>
                setGlobalError({
                  message: "",
                  visible: false,
                })
              }
            >
              {globalError.message}
            </Alert>
          )}
          <h1>Veuillez vous inscrire</h1>
          <hr />
          <Form onSubmit={onSubmit} className="mt-5">
            <FormInput
              label="Email"
              type="email"
              name="email"
              id="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={onChange}
              error={formError.email}
            />
            <FormInput
              label="Mot de passe"
              type="password"
              name="password"
              id="password"
              placeholder="******"
              value={formData.password}
              onChange={onChange}
              error={formError.password}
            />
            <FormInput
              label="Prénom"
              type="text"
              name="prenom"
              id="prenom"
              placeholder="John"
              value={formData.prenom}
              onChange={onChange}
              error={formError.prenom}
            />
            <FormInput
              label="Nom"
              type="text"
              name="nom"
              id="nom"
              placeholder="Doe"
              value={formData.nom}
              onChange={onChange}
              error={formError.nom}
            />
            <FormInput
              label="Image"
              type="text"
              name="image"
              id="image"
              placeholder="https://ma-photo-de-profil.fr"
              value={formData.image}
              onChange={onChange}
              error={formError.image}
            />
            <Button type="submit" disabled={isLoading} className="w-100">
              Inscription
            </Button>
          </Form>
          <div>
            <span>Déjà inscrit ? </span>
            <Link to="/login">connectez-vous</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
