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
import validateFields from "./formLogin.validator";
import { useHistory } from "react-router";

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
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;
