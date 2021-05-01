import { useState } from "react";
import { useSelector } from "react-redux";
import { Col } from "reactstrap";
import { getArticles } from "../../store/articles/articles.selector";
import CardArticle from "../CardArticle";
import Pagination from "../Pagination";

const ArticlesList = ({ limit }) => {
  const articles = useSelector(getArticles);
  const [pagination, setPagination] = useState({
    pageCount: Math.ceil(articles.length / limit),
    offset: 0,
  });

  const onChange = (data) => {
    setPagination({
      ...pagination,
      offset: data.selected * limit,
    });
  };

  if (articles.length === 0) {
    return <p>Aucun article</p>;
  }

  return (
    <>
      {articles.slice(pagination.offset, pagination.offset + limit).map((i) => (
        <Col key={i.id} xs={12} sm={6} md={4} className="mt-2 mb-2">
          <CardArticle data={i} />
        </Col>
      ))}
      <div className="d-flex justify-content-center w-100 mt-5">
        <Pagination pageCount={pagination.pageCount} onPageChange={onChange} />
      </div>
    </>
  );
};

export default ArticlesList;
