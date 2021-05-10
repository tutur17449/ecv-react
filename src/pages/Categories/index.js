import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Container, Row, Button } from "reactstrap";
import ArticlesList from "../../components/ArticlesList";
import CategoriesList from "../../components/CategoriesList";
import Spin from "../../components/Spin";
import useAuth from "../../hooks/useAuth";
import { getLoading } from "../../store/api/api.selectors";
import { getIsInit } from "../../store/articles/articles.selector";
import { fetchInitialArticles } from "../../store/articles/articles.slice";

const Categories = () => {
  const { user } = useAuth();
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
          <div className="d-flex flex-row justify-content-between align-items-center">
            <h1>Toutes les catégories</h1>
            {user && (
              <Button>
                <Link to="/categories/create" className="link-dark">
                  Ajouter une catégorie
                </Link>
              </Button>
            )}
          </div>
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
