import { useState } from "react";
import { Container, Row, Col, Button, Form, Alert } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import formValidator from "../../helpers/formValidator";
import formFieldValidator from "../../helpers/formFieldValidator";
import validateFields from "./formLogin.validator";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import FormInput from "../FormInput";

const LoginForm = () => {
  const { login } = useAuth();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [globalError, setGlobalError] = useState({
    visible: false,
    message: "",
  });
  const [formData, setFormData] = useState({
    email: "user@test.fr",
    password: "test",
  });
  const [formError, setFormError] = useState({
    email: "",
    password: "",
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
        await login(formData);
        history.push("/");
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
          <h1>Veuillez vous connecter</h1>
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
            <Button type="submit" disabled={isLoading} className="w-100">
              Connexion
            </Button>
          </Form>
          <div>
            <span>Pas encore inscrit ? </span>
            <Link to="/register">créez un compte</Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
