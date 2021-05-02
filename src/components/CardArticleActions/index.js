import { CardFooter } from "reactstrap";
import { BsFillTrashFill } from "react-icons/bs";
import { BsSlashSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const CardArticleActions = ({ current }) => {
  return (
    <CardFooter>
      <BsFillTrashFill className="icon" />
      <Link to={`/articles/${current}/edit`}>
        <BsSlashSquareFill className="icon" />
      </Link>
    </CardFooter>
  );
};

export default CardArticleActions;
