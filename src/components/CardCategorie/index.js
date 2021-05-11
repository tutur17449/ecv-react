import { Link } from "react-router-dom";
import { Col, Button } from "reactstrap";
import "./styles.scss";

const CardCategorie = ({ data, isAuthor }) => {
  return (
    <Col className="card-categorie text-center">
      <Link to={`/categories/${data.id}`}>
        <div>
          <img src={data.image} alt={data.nom} />
          <p>{data.nom}</p>
        </div>
      </Link>
      { isAuthor 
        ?  <Link to={`/categories/${data.id}/edit`}>
              <Button outline color="secondary">Modifier</Button>
            </Link>
        : ''
      }
    </Col>
  );
};

export default CardCategorie;
