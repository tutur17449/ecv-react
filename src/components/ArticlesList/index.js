import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { Col } from "reactstrap";
import { getArticlesWithSearch } from "../../store/articles/articles.selector";
import CardArticle from "../CardArticle";
import Pagination from "../Pagination";
import { fetchDeleteArticle } from "../../store/articles/articles.slice";
import { useParams } from "react-router";

const ArticlesList = ({ limit }) => {
  const { user } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState("");
  const articles = useSelector(getArticlesWithSearch(searchValue, id));
  const [pagination, setPagination] = useState({
    pageCount: Math.ceil(articles.length / limit),
    current: 0,
    offset: 0,
  });

  const onSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const onChange = (data) => {
    setPagination({
      ...pagination,
      current: data.selected,
      offset: data.selected * limit,
    });
  };

  const onDelete = (id) => {
    dispatch(fetchDeleteArticle(id));
  };

  useEffect(() => {
    setPagination({
      current: 0,
      offset: 0,
      pageCount: Math.ceil(articles.length / limit),
    });
  }, [articles.length, limit]);

  return (
    <>
      <Col xs={12}>
        <div className="w-100 d-flex flex-row justify-content-between align-center mb-3">
          <input
            name="search"
            value={searchValue}
            onChange={onSearch}
            placeholder="ex: imac"
            style={{
              borderRadius: "5px",
              padding: "6px 4px",
              minWidth: "30%",
            }}
          />
          {searchValue !== "" && (
            <p className="m-0">
              Résultat de la recherche pour : "{searchValue}"
            </p>
          )}
        </div>
      </Col>
      {articles.length === 0 ? (
        <Col xs={12} className="mt-5">
          <p>Aucun article</p>
        </Col>
      ) : (
        <>
          {articles
            .slice(pagination.offset, pagination.offset + limit)
            .map((i) => (
              <Col key={i.id} xs={12} sm={6} md={4} className="mt-2 mb-2">
                <CardArticle
                  data={i}
                  isAuthor={user && user.id === i.user_id}
                  onDelete={onDelete}
                />
              </Col>
            ))}
          <div className="d-flex justify-content-center w-100 mt-5">
            <Pagination
              forcePage={pagination.current}
              pageCount={pagination.pageCount}
              onPageChange={onChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ArticlesList;
