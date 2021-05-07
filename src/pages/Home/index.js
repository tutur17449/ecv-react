import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import ArticlesPreview from "../../components/ArticlesPreview";
import CategoriesList from "../../components/CategoriesList";
import Spin from "../../components/Spin";
import { getLoading } from "../../store/api/api.selectors";
import { getIsInit } from "../../store/articles/articles.selector";
import { fetchInitialArticles } from "../../store/articles/articles.slice";
import "./styles.scss";

const Home = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(getIsInit);
  const isLoading = useSelector(getLoading("getInitialArticles"));

  useEffect(() => {
    if (!isInit) {
      dispatch(fetchInitialArticles());
    }
  }, []);

  return (
    <>
      <Container fluid className="jumbtr">
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <h1>Zapple</h1>
        </div>
      </Container>
      <Container>
        <Row className="mt-5 mb-5">
          <Col>
            <h2>Toutes les catégories</h2>
          </Col>
        </Row>
        <CategoriesList />
        <Row>
          <Col xs={12} className="mt-5 mb-5">
            <h2>Derniers articles</h2>
          </Col>
          {!isInit || isLoading ? <Spin /> : <ArticlesPreview />}
        </Row>
      </Container>
    </>
  );
};

export default Home;
