import { useHistory, useParams } from "react-router";
import { getArticle } from "../../store/articles/articles.selector";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import "./styles.scss";
import ManageQty from "../ManageQty";
import CardArticleActions from "../CardArticleActions";
import { fetchDeleteArticle } from "../../store/articles/articles.slice";
import useAuth from "../../hooks/useAuth";

const ArticleView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const history = useHistory();
  const article = useSelector(getArticle(id));

  const onDelete = (id) => {
    dispatch(fetchDeleteArticle(id));
    history.goBack(-1);
  };

  if (!article) {
    return <p>Aucune donnée</p>;
  }

  return (
    <Row id="article">
      <Col xs={12} lg={6} className="mt-5 mb-5">
        <img src={article.image} alt={article.nom} />
      </Col>
      <Col xs={12} lg={6} className="m-auto">
        <div className="article-header">
          <h1>{article.nom}</h1>
          <h2>{article.prix} €</h2>
        </div>
        <hr />
        <p>{article.description}</p>
        <ManageQty prix={article.prix} />
        {(user && user.id === article.user_id) && (
          <CardArticleActions
            current={article.id}
            onDelete={onDelete}
            styles="mt-2"
          />
        )}
      </Col>
    </Row>
  );
};

export default ArticleView;
