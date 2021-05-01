import { Spinner } from "reactstrap";
import "./styles.scss";

const Spin = () => {
  return (
    <div className="spin">
      <Spinner color="secondary" />
      <span>Chargement en cours ...</span>
    </div>
  );
};

export default Spin;
