import { gql, QueryHookOptions, useQuery } from "@apollo/client";
import { ORDER_FRAGMENT } from "../../fragments";
import { getOrders, getOrdersVariables } from "../../__generated__/getOrders";

const GET_ORDERS_QUERY = gql`
  query getOrders($input: GetOrdersInput) {
    getOrders(input: $input) {
      ok
      error {
        code
        message
      }
      orders {
        ...OrderParts
      }
    }
  }
  ${ORDER_FRAGMENT}
`;

const useGetOrders = (
  options?: QueryHookOptions<getOrders, getOrdersVariables>
) => {
  const { data, ...others } = useQuery<getOrders, getOrdersVariables>(
    GET_ORDERS_QUERY,
    options
  );
  return {
    orders: data?.getOrders.orders,
    data,
    ...others,
  };
};

export default useGetOrders;
