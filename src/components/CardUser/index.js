import { Container, Row, Col, Button } from "reactstrap";

const CardUser = ({ user, setIsUpdating }) => {
  const goToUpdate = () => {
    setIsUpdating(true);
  };
  return (
    <Container>
      <Row>
        <Col lg="6" className="m-auto pt-5">
          <h1>Mon profil</h1>
          <hr />
          <div className="profil-container">
            <div className="profil-informations">
              <div>
                <div>Email</div>
                <div>{user.email}</div>
              </div>
              <div>
                <div>Prénom</div>
                <div>{user.prenom}</div>
              </div>
              <div>
                <div>Nom</div>
                <div>{user.nom}</div>
              </div>
              <Button outline onClick={goToUpdate} color="secondary">
                Modifier le profil
              </Button>{" "}
            </div>
            <div className="profil-picture">
              <img src={user.image} alt="profil" />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CardUser;
