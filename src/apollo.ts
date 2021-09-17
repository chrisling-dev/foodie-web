import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { AUTH_TOKEN } from "./utils/constants";

const token = localStorage.getItem(AUTH_TOKEN);
export const isLoggedInVar = makeVar(Boolean(token));
export const authTokenVar = makeVar(token);

const httpLink = createHttpLink({
  uri: "http://localhost:5001/graphql",
});

const authLink = setContext((_, { headers }) => ({
  headers: {
    ...headers,
    Authorization: `Bearer ${authTokenVar()}`,
  },
}));

const errorLink = onError(({ graphQLErrors, networkError }) => {
  console.log(graphQLErrors, networkError);
});
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink.concat(errorLink)),
  cache: new InMemoryCache(),
});

export default apolloClient;
