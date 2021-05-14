import LoginForm from "../../components/LoginForm";
import withNoAuth from "../../hoc/withNoAuth";

const Login = () => {
  return <LoginForm />;
};

export default withNoAuth(Login);
