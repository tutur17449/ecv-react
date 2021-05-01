import { useParams } from "react-router";
import { getArticle } from "../../store/articles/articles.selector";
import { useSelector } from "react-redux";
import { Col, Row } from "reactstrap";
import "./styles.scss";

const ArticleView = () => {
  const { id } = useParams();
  const article = useSelector(getArticle(id));

  if (!article) {
    return <p>Aucune donnée</p>;
  }

  return (
    <Row id="article">
      <Col xs={12} lg={6}>
        <img src={article.image} alt={article.nom} />
      </Col>
      <Col xs={12} lg={6} className="m-auto">
        <h1>{article.nom}</h1>
        <hr />
        <p>{article.description}</p>
      </Col>
    </Row>
  );
};

export default ArticleView;
