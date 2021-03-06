import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIsInit } from "../../store/articles/articles.selector";
import { getLoading } from "../../store/api/api.selectors";
import { fetchInitialArticles } from "../../store/articles/articles.slice";
import { Container, Row } from "reactstrap";
import ArticleView from "../../components/ArticleView";
import Spin from "../../components/Spin";

const Article = () => {
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
      {!isInit || isLoading ? (
        <Row>
          <Spin />
        </Row>
      ) : (
        <ArticleView />
      )}
    </Container>
  );
};

export default Article;
