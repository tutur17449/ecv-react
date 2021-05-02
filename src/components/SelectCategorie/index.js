import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoading } from "../../store/api/api.selectors";
import {
  getCategories,
  getIsInit,
} from "../../store/categories/categories.selector";
import { fetchInitialCategories } from "../../store/categories/categories.slice";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const SelectCategorie = ({ value, error, onChange }) => {
  const dispatch = useDispatch();
  const isInit = useSelector(getIsInit);
  const isLoading = useSelector(getLoading("getInitialCategories"));
  const categories = useSelector(getCategories);

  useEffect(() => {
    if (!isInit) {
      dispatch(fetchInitialCategories());
    }
  }, []);

  return (
    <FormGroup>
      <Label for="exampleCategorie">Catégorie</Label>
      <Input
        type="select"
        name="categorie_id"
        id="exampleCategorie"
        placeholder="Ordinateur"
        value={value}
        onChange={onChange}
        invalid={error !== "" && true}
        disabled={isLoading}
      >
        {categories.length !== 0 &&
          categories.map((i) => (
            <option key={i.id} value={i.id}>
              {i.nom}
            </option>
          ))}
      </Input>
      {error !== "" && <FormFeedback>{error}</FormFeedback>}
    </FormGroup>
  );
};

export default SelectCategorie;
