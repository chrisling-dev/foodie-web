import { useHistory } from "react-router-dom";

const useNavigate = () => {
  const history = useHistory();

  const toCreateAccount = () => history.push("/create-account");
  const toHome = () => history.push("/");
  const toSignIn = () => history.push("/sign-in");
  return {
    toCreateAccount,
    toHome,
    toSignIn,
  };
};

export default useNavigate;
