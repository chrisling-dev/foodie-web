import { gql, useQuery } from "@apollo/client";
import { me } from "../../__generated__/me";

const ME_QUERY = gql`
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

const useMe = () => {
  return useQuery<me>(ME_QUERY);
};

export default useMe;
