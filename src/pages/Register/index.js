import RegisterForm from "../../components/RegisterForm";
import withNoAuth from "../../hoc/withNoAuth";

const Register = () => {
  return <RegisterForm />;
};

export default withNoAuth(Register);
