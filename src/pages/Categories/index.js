import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import ArticlesList from "../../components/ArticlesList";
import CategoriesList from "../../components/CategoriesList";
import Spin from "../../components/Spin";
import { getLoading } from "../../store/api/api.selectors";
import { getIsInit } from "../../store/articles/articles.selector";
import { fetchInitialArticles } from "../../store/articles/articles.slice";

const Categories = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(getIsInit);
  const isLoading = useSelector(getLoading("getInitialArticles"));

  useEffect(() => {
    if (!isInit) {
      dispatch(fetchInitialArticles());
    }
  }, []);

  return (
    <Container>
      <Row className="mt-5 mb-5">
        <Col>
          <h1>Toutes les catégories</h1>
        </Col>
      </Row>
      <CategoriesList />
      <Row className="mt-5">
        {!isInit || isLoading ? <Spin /> : <ArticlesList limit={6} />}
      </Row>
    </Container>
  );
};

export default Categories;
