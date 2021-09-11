import { useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { AUTH_TOKEN } from "../utils/constants";
import { ME_QUERY } from "./queries/useMe";

const useSignOut = () => {
  const history = useHistory();
  const apolloClient = useApolloClient();

  const signOut = () => {
    apolloClient.writeQuery({
      query: ME_QUERY,
      data: {
        me: null,
      },
    });
    localStorage.removeItem(AUTH_TOKEN);
    history.push("/");
    authTokenVar(null);
    isLoggedInVar(false);
  };

  return signOut;
};

export default useSignOut;
