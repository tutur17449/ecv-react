import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import ArticlesList from "../../components/ArticlesList";
import { getLoading } from "../../store/api/api.selectors";
import { getIsInit } from "../../store/articles/articles.selector";
import { fetchInitialArticles } from "../../store/articles/articles.slice";

const Articles = () => {
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
          <h1>Tous les produits</h1>
        </Col>
      </Row>
      <Row>
        {!isInit || isLoading ? (
          <p>Chargement des articles ...</p>
        ) : (
          <ArticlesList limit={6} />
        )}
      </Row>
    </Container>
  );
};

export default Articles;
