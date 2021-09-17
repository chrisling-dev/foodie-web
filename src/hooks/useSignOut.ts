import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { AUTH_TOKEN } from "../utils/constants";

const useSignOut = () => {
  const history = useHistory();
  const apolloClient = useApolloClient();

  const signOut = () => {
    localStorage.removeItem(AUTH_TOKEN);
    apolloClient.resetStore();
    authTokenVar(null);
    history.push("/");
    isLoggedInVar(false);
  };

  return signOut;
};

export default useSignOut;
