import { Link } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import "./styles.scss";

const Footer = () => {
  return (
    <footer>
      <Container fluid>
        <Row>
          <Col lg="8" className="m-auto">
            <Row>
              <Col>
                <div className="d-flex justify-content-between">
                  <Link to="/">
                    <span className="nav-link">Accueil</span>
                  </Link>
                  <Link to="/articles">
                    <span className="nav-link">Articles</span>
                  </Link>
                  <Link to="/categories">
                    <span className="nav-link">Categories</span>
                  </Link>
                </div>
              </Col>
            </Row>
            <hr />
            <Row>
              <Col>Copyright © 2021. Tous droits réservés.</Col>
            </Row>
            <Row>
              <Col>Arthur HAMEL - Raphaël HERBLOT - Alex LYS</Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
