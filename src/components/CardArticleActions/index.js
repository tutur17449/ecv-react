import { CardFooter } from "reactstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { BsSlashSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const CardArticleActions = ({ current, onDelete, styles = null }) => {
  return (
    <CardFooter className={styles}>
      <BsFillTrashFill className="icon" onClick={() => onDelete(current)} />
      <Link to={`/articles/${current}/edit`}>
        <BsSlashSquareFill className="icon" />
      </Link>
    </CardFooter>
  );
};

export default CardArticleActions;
