import { useState } from "react";
import { Container, Row, Col, Button, Form } from "reactstrap";
import useAuth from "../../hooks/useAuth";
import formValidator from "../../helpers/formValidator";
import formFieldValidator from "../../helpers/formFieldValidator";
import validateFields from "./formArticle.validator";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreateArticle,
  fetchUpdateArticle,
} from "../../store/articles/articles.slice";
import { getLoading } from "../../store/api/api.selectors";
import SelectCategorie from "../SelectCategorie";
import { getArticle } from "../../store/articles/articles.selector";
import FormInput from "../FormInput";

const ArticleForm = () => {
  const { id } = useParams();
  const article = useSelector(getArticle(id));
  const { user } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(getLoading("articleActions"));
  const [formData, setFormData] = useState(
    article
      ? {
          ...article,
        }
      : {
          nom: "",
          image: "",
          description: "",
          prix: "",
          categorie_id: "",
        }
  );
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
      article
        ? dispatch(
            fetchUpdateArticle({
              ...formData,
            })
          )
        : dispatch(
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
          {article ? (
            <h1>Modifier l'article</h1>
          ) : (
            <h1>Ajouter un nouvel article</h1>
          )}
          <hr />
          <Form onSubmit={onSubmit} className="mt-5">
            <FormInput
              label="Nom"
              type="text"
              name="nom"
              id="nom"
              placeholder="iMac"
              value={formData.nom}
              onChange={onChange}
              error={formError.nom}
            />
            <FormInput
              label="Image"
              type="text"
              name="image"
              id="image"
              placeholder="https://path-to-image.fr"
              value={formData.image}
              onChange={onChange}
              error={formError.image}
            />
            <FormInput
              label="Description"
              type="text"
              name="description"
              id="description"
              placeholder="Caractéristiques du produit"
              value={formData.description}
              onChange={onChange}
              error={formError.description}
            />
            <FormInput
              label="Prix"
              type="number"
              name="prix"
              id="prix"
              placeholder="399"
              value={formData.prix}
              onChange={onChange}
              error={formError.prix}
            />
            <SelectCategorie
              value={formData.categorie_id}
              onChange={onChange}
              error={formError.categorie_id}
            />
            <Button type="submit" disabled={isLoading} className="w-100">
              {article ? "Modifier" : "Ajouter"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleForm;
