import React, { useState } from "react";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  getOrder_getOrder_order_restaurant,
  getOrder_getOrder_order_user,
} from "../../../__generated__/getOrder";
import Button from "../../button/button";
import Checkbox from "../../checkbox/checkbox";
import {
  blockUser,
  blockUserVariables,
} from "../../../__generated__/blockUser";
import ErrorMessage from "../../error-message/error-message";

const BLOCK_USER_MUTATION = gql`
  mutation blockUser($input: BlockUserInput!) {
    blockUser(input: $input) {
      ok
      error {
        code
        message
      }
    }
  }
`;

interface IProps {
  blocked?: boolean;
  restaurant: getOrder_getOrder_order_restaurant;
  user: getOrder_getOrder_order_user;
  onCancel: () => void;
  onSuccess: () => void;
}
const BlockControl: React.FC<IProps> = ({
  blocked,
  restaurant,
  user,
  onCancel,
  onSuccess,
}) => {
  const [all, setAll] = useState(false);
  const [blockUserMutation, { data, loading }] = useMutation<
    blockUser,
    blockUserVariables
  >(BLOCK_USER_MUTATION, {
    onCompleted({ blockUser: { ok } }) {
      if (ok) onSuccess();
    },
  });

  const getRestaurantName = () =>
    all ? (
      <span className=" font-semibold italic">all of your restaurants</span>
    ) : (
      <span className=" font-semibold italic">{restaurant.name}</span>
    );

  const getUserName = () => (
    <span className=" font-semibold italic">{user.name}</span>
  );
  const onBlockUser = () => {
    blockUserMutation({
      variables: {
        input: {
          blockId: user.id,
          unblock: blocked,
          all,
          restaurantId: restaurant.id,
        },
      },
    });
  };
  return (
    <div>
      <div className=" bg-gray-100 rounded-lg p-3">
        {blocked ? (
          <p className=" text-sm text-gray-500">
            Changed your mind? You may choose to unblock the {getUserName()}{" "}
            from {getRestaurantName()}.
          </p>
        ) : (
          <p className=" text-sm text-gray-500">
            Are you sure you want to block {getUserName()} from{" "}
            {getRestaurantName()}? {getUserName()} won't be notified but they
            will not see your restaurant when they browse again. You may unblock
            them anytime in the future.
          </p>
        )}
      </div>
      <Checkbox
        containerClassName=" my-3"
        isChecked={all}
        message={`${
          blocked ? "Unblock" : "Block"
        } user from all of my restaurants`}
        onCheck={setAll.bind(this, !all)}
      />
      {data?.blockUser.error && (
        <ErrorMessage>{data.blockUser.error.message}</ErrorMessage>
      )}
      <div className=" flex flex-col items-center justify-end lg:flex-row mt-6">
        <Button
          className=" mb-3 w-full lg:w-auto lg:mb-0 lg:mr-3"
          appearance="primary"
          disabled={loading}
          intent="danger"
          loading={loading}
          onClick={onBlockUser}
        >
          {blocked ? "Unblock user" : "Block User"}
        </Button>
        <Button
          className="w-full lg:w-auto"
          disabled={loading}
          loading={loading}
          onClick={onCancel}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default BlockControl;
