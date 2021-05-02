import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from "reactstrap";
import CardArticleActions from "../CardArticleActions";
import "./styles.scss";

const CardArticle = ({ data, isAuthor, onDelete }) => {
  return (
    <Card>
      <Link to={`/articles/${data.id}`} className="card-link">
        <CardImg top width="100%" src={data.image} alt={data.nom} />
      </Link>
      <CardBody>
        <CardTitle tag="h5">{data.nom}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {data.prix} €
        </CardSubtitle>
        <CardText>{data.description}</CardText>
      </CardBody>
      {isAuthor && <CardArticleActions current={data.id} onDelete={onDelete} />}
    </Card>
  );
};

export default CardArticle;
