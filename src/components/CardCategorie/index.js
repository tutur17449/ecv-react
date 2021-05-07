import { Link } from "react-router-dom";
import { Col } from "reactstrap";
import "./styles.scss";

const CardCategorie = ({ data }) => {
  return (
    <Col className="card-categorie">
      <Link to={`/categories/${data.id}`}>
        <div>
          <img src={data.image} alt={data.nom} />
          <p>{data.nom}</p>
        </div>
      </Link>
    </Col>
  );
};

export default CardCategorie;
