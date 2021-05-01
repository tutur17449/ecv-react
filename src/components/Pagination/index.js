import ReactPaginate from "react-paginate";
import "./styles.scss";

const Pagination = ({ pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      previousLabel={"Précédent"}
      nextLabel={"Suivant"}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      onPageChange={onPageChange}
      containerClassName={"pagination"}
      activeClassName={"active"}
    />
  );
};

export default Pagination;
