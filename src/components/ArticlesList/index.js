import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { getArticles } from "../../store/articles/articles.selector";
import CardArticle from "../CardArticle";

const ArticlesList = () => {
  const articles = useSelector(getArticles);

  if (articles.length === 0) {
    return <p>Aucun article</p>;
  }

  return articles.map((i) => (
    <Col key={i.id} xs={12} sm={6} md={4} className="mt-2 mb-2">
      <CardArticle data={i} />
    </Col>
  ));
};

export default ArticlesList;
