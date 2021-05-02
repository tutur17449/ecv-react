import ArticleForm from "../../components/ArticleForm";
import withAuth from "../../hoc/withAuth";

const CreateArticle = () => {
  return <ArticleForm />;
};

export default withAuth(CreateArticle);
