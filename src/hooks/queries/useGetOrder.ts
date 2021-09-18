import { gql } from "@apollo/client";

const GET_ORDER_QUERY = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error {
        code
        message
      }
      order {
        id
        price
        status
        statusHistory {
          id
          status
          user {
            id
            name
            role
          }
        }
        restaurant {
          id
          name
          description
          backgroundImage
        }
        items {
          id
          name
          quantity
          price
          photo
          dish {
            id
            name
          }
        }
      }
    }
  }
`;

const useGetOrder = () => {
  return;
};

export default useGetOrder;
