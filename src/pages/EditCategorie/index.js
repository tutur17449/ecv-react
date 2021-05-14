import withAuth from "../../hoc/withAuth";
import Spin from "../../components/Spin";
import CategoryForm from "../../components/CategoryForm";
import { useDispatch, useSelector } from "react-redux";
import { getIsInit } from "../../store/categories/categories.selector";
import { getLoading } from "../../store/api/api.selectors";
import { useEffect } from "react";
import { fetchInitialCategories } from "../../store/categories/categories.slice";

const EditCategorie = () => {
  const dispatch = useDispatch();
  const isInit = useSelector(getIsInit);
  const isLoading = useSelector(getLoading("getInitialCategories"));

  useEffect(() => {
    if (!isInit) {
      dispatch(fetchInitialCategories());
    }
  }, []);

  return !isInit || isLoading ? <Spin /> : <CategoryForm />;
};

export default withAuth(EditCategorie);
