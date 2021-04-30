import { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Alert,
} from "reactstrap";
import useAuth from "../../hooks/useAuth";
import formValidator from "../../helpers/formValidator";
import formFieldValidator from "../../helpers/formFieldValidator";
import validateFields from "./formRegister.validator";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

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
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={onChange}
                invalid={formError.email !== "" && true}
              />
              {formError.email !== "" && (
                <FormFeedback>{formError.email}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Mot de passe</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="******"
                value={formData.password}
                onChange={onChange}
                invalid={formError.password !== "" && true}
              />
              {formError.password !== "" && (
                <FormFeedback>{formError.password}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="prenom">Prénom</Label>
              <Input
                type="text"
                name="prenom"
                id="prenom"
                placeholder="John"
                value={formData.prenom}
                onChange={onChange}
                invalid={formError.prenom !== "" && true}
              />
              {formError.prenom !== "" && (
                <FormFeedback>{formError.prenom}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="nom">Nom</Label>
              <Input
                type="text"
                name="nom"
                id="nom"
                placeholder="Doe"
                value={formData.nom}
                onChange={onChange}
                invalid={formError.nom !== "" && true}
              />
              {formError.nom !== "" && (
                <FormFeedback>{formError.nom}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="image">Image</Label>
              <Input
                type="text"
                name="image"
                id="image"
                placeholder="https://ma-photo-de-profil.fr"
                value={formData.image}
                onChange={onChange}
                invalid={formError.image !== "" && true}
              />
              {formError.image !== "" && (
                <FormFeedback>{formError.image}</FormFeedback>
              )}
            </FormGroup>
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
