import ReactPaginate from "react-paginate";
import "./styles.scss";

const Pagination = ({ forcePage, pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      forcePage={forcePage}
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
