import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import "./styles.scss";

const CardArticle = ({ data }) => {
  return (
    <Card>
      <CardImg top width="100%" src={data.image} alt={data.nom} />
      <CardBody>
        <CardTitle tag="h5">{data.nom}</CardTitle>
        <CardSubtitle tag="h6" className="mb-2 text-muted">
          {data.prix} €
        </CardSubtitle>
        <CardText>{data.description}</CardText>
        <Button>Button</Button>
      </CardBody>
    </Card>
  );
};

export default CardArticle;
