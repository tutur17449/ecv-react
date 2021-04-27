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
        <Col>
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
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="exampleEmail">Email</Label>
              <Input
                type="email"
                name="email"
                id="exampleEmail"
                placeholder="with a placeholder"
                value={formData.email}
                onChange={onChange}
                invalid={formError.email !== "" && true}
              />
              {formError.email !== "" && (
                <FormFeedback>{formError.email}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
                placeholder="password placeholder"
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
                placeholder="prenom placeholder"
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
                placeholder="nom placeholder"
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
                placeholder="image placeholder"
                value={formData.image}
                onChange={onChange}
                invalid={formError.image !== "" && true}
              />
              {formError.image !== "" && (
                <FormFeedback>{formError.image}</FormFeedback>
              )}
            </FormGroup>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
