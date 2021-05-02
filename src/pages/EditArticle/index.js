import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ArticleForm from "../../components/ArticleForm";
import withAuth from "../../hoc/withAuth";
import Spin from "../../components/Spin";
import { getLoading } from "../../store/api/api.selectors";
import { getIsInit } from "../../store/articles/articles.selector";
import { fetchInitialArticles } from "../../store/articles/articles.slice";

const EditArticle = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(getIsInit);
  const isLoading = useSelector(getLoading("getInitialArticles"));

  useEffect(() => {
    if (!isInit) {
      dispatch(fetchInitialArticles());
    }
  }, []);

  return !isInit || isLoading ? <Spin /> : <ArticleForm />;
};

export default withAuth(EditArticle);
