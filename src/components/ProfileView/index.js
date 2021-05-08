import "./styles.scss";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { Container, Row, Col, Button, Form } from "reactstrap";
import formValidator from "../../helpers/formValidator";
import formFieldValidator from "../../helpers/formFieldValidator";
import validateFields from "./formRegister.validator";
import FormInput from "../FormInput";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import {
    fetchUpdateUser,
  } from "../../store/users/users.slice";


const ProfileView = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const [isLoading] = useState(false);
  const history = useHistory();
  const [setGlobalError] = useState({
    visible: false,
    message: "",
  });

  const [formData, setFormData] = useState(
    user
      ? {
          ...user,
        }
      : {
          email: "",
          password: "",
          prenom: "",
          nom: "",
          image: "",
        }
  );

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

  const onSubmit = (e) => {
    e.preventDefault();
    const validation = formValidator(
      formError,
      setFormError,
      formData,
      validateFields
    );

    if (!validation) {
          dispatch(
              fetchUpdateUser({
                ...formData,
              })
            );
        history.goBack(-1);
      }
  };

  return (
    <Container>
        <Row>
        <Col lg="6" className="m-auto pt-5">
        <h1>Mon profil</h1>
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
                Sauvegarder le profil
            </Button>
            </Form>
            <div>
            </div>
        </Col>
        </Row>
    </Container>
  );
};

export default ProfileView;
