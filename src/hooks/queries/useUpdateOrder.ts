import { gql, useMutation } from "@apollo/client";
import {
  updateOrderStatus,
  updateOrderStatusVariables,
} from "../../__generated__/updateOrderStatus";

const UPDATE_ORDER_STATUS_MUTATION = gql`
  mutation updateOrderStatus($input: UpdateOrderStatusInput!) {
    updateOrderStatus(input: $input) {
      ok
      error {
        code
        message
      }
      status {
        id
        createdAt
        status
        user {
          id
          name
          role
        }
      }
    }
  }
`;

const useUpdateOrderStatus = () => {
  const [updateOrderStatusMutation, { data, loading }] = useMutation<
    updateOrderStatus,
    updateOrderStatusVariables
  >(UPDATE_ORDER_STATUS_MUTATION);

  const updateOrderStatus = (id: number, cb?: any) => {
    updateOrderStatusMutation({
      variables: {
        input: {
          id,
        },
      },
    }).then(() => {
      typeof cb === "function" && cb();
    });
  };
  return {
    updateOrderStatus,
    data,
    loading,
  };
};

export default useUpdateOrderStatus;
