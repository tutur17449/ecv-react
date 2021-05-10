import CategoryForm from "../../components/CategoryForm";
import withAuth from "../../hoc/withAuth";

const CreateCategorie = () => {
  return <CategoryForm />;
};

export default withAuth(CreateCategorie);

