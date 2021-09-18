import { useHistory } from "react-router-dom";

const useNavigate = () => {
  const history = useHistory();

  const toCheckout = () => history.push("/checkout");
  const toCreateAccount = () => history.push("/create-account");
  const toHome = () => history.push("/");
  const toSignIn = () => history.push("/sign-in");
  return {
    toCheckout,
    toCreateAccount,
    toHome,
    toSignIn,
  };
};

export default useNavigate;
