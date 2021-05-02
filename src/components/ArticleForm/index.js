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
} from "reactstrap";
import useAuth from "../../hooks/useAuth";
import formValidator from "../../helpers/formValidator";
import formFieldValidator from "../../helpers/formFieldValidator";
import validateFields from "./formArticle.validator";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCreateArticle } from "../../store/articles/articles.slice";
import { getLoading } from "../../store/api/api.selectors";
import SelectCategorie from "../SelectCategorie";

const ArticleForm = () => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(getLoading("articleActions"));
  const [formData, setFormData] = useState({
    nom: "",
    image: "",
    description: "",
    prix: "",
    categorie_id: "",
  });
  const [formError, setFormError] = useState({
    nom: "",
    image: "",
    description: "",
    prix: "",
    categorie_id: "",
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
        fetchCreateArticle({
          ...formData,
          prix: parseInt(formData.prix),
          categorie_id: parseInt(formData.categorie_id),
          user_id: user.id,
          created_at: new Date(),
        })
      );
      history.goBack(-1);
    }
  };

  return (
    <Container>
      <Row>
        <Col lg="6" className="m-auto pt-5">
          <h1>Ajouter un nouvel article</h1>
          <hr />
          <Form onSubmit={onSubmit} className="mt-5">
            <FormGroup>
              <Label for="exampleNom">Nom</Label>
              <Input
                type="text"
                name="nom"
                id="exampleNom"
                placeholder="iMac"
                value={formData.nom}
                onChange={onChange}
                invalid={formError.nom !== "" && true}
              />
              {formError.nom !== "" && (
                <FormFeedback>{formError.nom}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="exampleImage">Image</Label>
              <Input
                type="text"
                name="image"
                id="exampleImage"
                placeholder="https://path-to-image.fr"
                value={formData.image}
                onChange={onChange}
                invalid={formError.image !== "" && true}
              />
              {formError.image !== "" && (
                <FormFeedback>{formError.image}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="exampleDescription">Description</Label>
              <Input
                type="text"
                name="description"
                id="exampleDescription"
                placeholder="Caractéristiques du produit"
                value={formData.description}
                onChange={onChange}
                invalid={formError.description !== "" && true}
              />
              {formError.description !== "" && (
                <FormFeedback>{formError.description}</FormFeedback>
              )}
            </FormGroup>
            <FormGroup>
              <Label for="examplePrix">Prix</Label>
              <Input
                type="number"
                name="prix"
                id="examplePrix"
                placeholder="399"
                value={formData.prix}
                onChange={onChange}
                invalid={formError.prix !== "" && true}
              />
              {formError.prix !== "" && (
                <FormFeedback>{formError.prix}</FormFeedback>
              )}
            </FormGroup>
            <SelectCategorie
              value={formData.categorie_id}
              onChange={onChange}
              error={formError.categorie_id}
            />
            <Button type="submit" disabled={isLoading} className="w-100">
              Ajouter
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleForm;
