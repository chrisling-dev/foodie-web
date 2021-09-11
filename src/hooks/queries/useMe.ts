import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { me } from "../../__generated__/me";

export const ME_QUERY = gql`
  query me {
    me {
      id
      email
      name
      role
      __typename
    }
  }
`;

const useMe = (options?: QueryHookOptions) => {
  return useQuery<me>(ME_QUERY, options);
};

export default useMe;
