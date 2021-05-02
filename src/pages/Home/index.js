import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import ArticlesPreview from "../../components/ArticlesPreview";
import Spin from "../../components/Spin";
import { getLoading } from "../../store/api/api.selectors";
import { getIsInit } from "../../store/articles/articles.selector";
import { fetchInitialArticles } from "../../store/articles/articles.slice";
import "./styles.scss";

const Home = () => {
  const dispatch = useDispatch();
  const isArticleInit = useSelector(getIsInit);
  const isArticleLoading = useSelector(getLoading("getInitialArticles"));

  useEffect(() => {
    if (!isArticleInit) {
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
        <Row>
          <Col xs={12} className="mt-5 mb-5">
            <h2>Derniers articles</h2>
          </Col>
          {!isArticleInit || isArticleLoading ? <Spin /> : <ArticlesPreview />}
        </Row>
      </Container>
    </>
  );
};

export default Home;
