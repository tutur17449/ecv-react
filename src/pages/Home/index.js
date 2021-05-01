import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import ArticlesPreview from "../../components/ArticlesPreview";
import Spin from "../../components/Spin";
import { getLoading } from "../../store/api/api.selectors";
import { getIsInit } from "../../store/articles/articles.selector";
import { fetchInitialArticles } from "../../store/articles/articles.slice";

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
    <Container>
      <Row>
        <Col>
          <h1>Zapple</h1>
          <h2>Derniers articles</h2>
        </Col>
      </Row>
      <Row>{!isInit || isLoading ? <Spin /> : <ArticlesPreview />}</Row>
    </Container>
  );
};

export default Home;
