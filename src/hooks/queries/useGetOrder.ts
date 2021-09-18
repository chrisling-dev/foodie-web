import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { ORDER_FRAGMENT } from "../../fragments";
import { getOrder, getOrderVariables } from "../../__generated__/getOrder";

const GET_ORDER_QUERY = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error {
        code
        message
      }
      order {
        ...OrderParts
      }
    }
  }
  ${ORDER_FRAGMENT}
`;

const useGetOrder = (
  options: QueryHookOptions<getOrder, getOrderVariables>
) => {
  return useQuery<getOrder, getOrderVariables>(GET_ORDER_QUERY, options);
};

export default useGetOrder;
