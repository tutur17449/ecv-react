import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "reactstrap";
import { getLoading } from "../../store/api/api.selectors";
import {
  getCategories,
  getIsInit,
} from "../../store/categories/categories.selector";
import { fetchInitialCategories } from "../../store/categories/categories.slice";
import CardCategorie from "../CardCategorie";
import Spin from "../Spin";

const CategoriesList = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(getIsInit);
  const isLoading = useSelector(getLoading("getInitialCategories"));
  const categories = useSelector(getCategories);

  useEffect(() => {
    if (!isInit) {
      dispatch(fetchInitialCategories());
    }
  }, []);

  if (!isInit || isLoading) {
    return (
      <Row>
        <Col xs={12}></Col>
        <Spin />
      </Row>
    );
  }

  if (categories.length === 0) {
    return (
      <Row>
        <Col xs={12}>
          <p>Aucune donnée</p>
        </Col>
      </Row>
    );
  }

  return (
    <Row>
      {categories.map((i) => (
        <CardCategorie key={i.id} data={i} />
      ))}
    </Row>
  );
};

export default CategoriesList;
