import { useHistory } from "react-router-dom";
import useHideHeader from "../../hooks/useHideHeader";

const SignIn = () => {
  const history = useHistory();
  useHideHeader();
  return (
    <div>
      Sign in
      <p onClick={() => history.push("/")}>Go back</p>
    </div>
  );
};

export default SignIn;
