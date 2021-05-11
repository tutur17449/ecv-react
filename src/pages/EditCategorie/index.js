import withAuth from "../../hoc/withAuth";
import CategoryForm from "../../components/CategoryForm";

const EditCategorie = () => {
  return (
    <CategoryForm />
  );
};

export default withAuth(EditCategorie);
