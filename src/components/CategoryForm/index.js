import { useState } from "react";
import { Container, Row, Col, Button, Form } from "reactstrap";
import { BsFillTrashFill } from "react-icons/bs";
import useAuth from "../../hooks/useAuth";
import formValidator from "../../helpers/formValidator";
import formFieldValidator from "../../helpers/formFieldValidator";
import validateFields from "./formCategory.validator";
import { useHistory, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCreateCategory,
  fetchUpdateCategory,
  fetchDeleteCategory,
} from "../../store/categories/categories.slice";
import { getLoading } from "../../store/api/api.selectors";
import { getCategory } from "../../store/categories/categories.selector";
import FormInput from "../FormInput";
import "./styles.scss";

const CategoryForm = () => {
  const { id } = useParams();
  const category = useSelector(getCategory(id));
  const { user } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector(getLoading("categoryActions"));
  const [formData, setFormData] = useState(
    category
      ? {
          ...category,
        }
      : {
          nom: "",
          image: "",
        }
  );
  const [formError, setFormError] = useState({
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
      category
        ? dispatch(
            fetchUpdateCategory({
              ...formData,
            })
          )
        : dispatch(
            fetchCreateCategory({
              ...formData,
              user_id: user.id,
            })
          );
      history.goBack(-1);
    }
  };

  const handleDelete = (id) => {
    dispatch(fetchDeleteCategory(id));
    history.goBack(-1);
  };

  return (
    <Container>
      <Row>
        <Col lg="6" className="m-auto pt-5">
          {category ? (
            <h1>
              Modifier la catégorie
              <Button
                type="button"
                onClick={() => handleDelete(formData?.id)}
                disabled={isLoading}
                color="danger"
                className="button-delete-category"
              >
                <BsFillTrashFill className="icon" />
              </Button>
            </h1>
          ) : (
            <h1>Ajouter une nouvelle catégorie</h1>
          )}
          <hr />
          <Form onSubmit={onSubmit} className="mt-5">
            <FormInput
              label="Nom"
              type="text"
              name="nom"
              id="nom"
              placeholder="iPhone"
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
            <Button type="submit" disabled={isLoading} className="w-100">
              {category ? "Modifier" : "Ajouter"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CategoryForm;
