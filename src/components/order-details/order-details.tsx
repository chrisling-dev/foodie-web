import React, { useEffect, useState } from "react";
import useMe from "../../hooks/queries/useMe";
import useUpdateOrderStatus from "../../hooks/queries/useUpdateOrder";
import { dateGenerator } from "../../utils/helper";
import { getOrder_getOrder_order } from "../../__generated__/getOrder";
import { OrderStatusStatus, UserRole } from "../../__generated__/globalTypes";
import Button from "../button/button";
import OrderItem from "./order-item/order-item";
import { orderStatusMap } from "../../utils/order-status.map";
import { seenOrder, seenOrderVariables } from "../../__generated__/seenOrder";
import { gql, useMutation } from "@apollo/client";
import Modal from "../modal/modal";
import BlockControl from "./block-control/block-control";

const SEEN_ORDER_MUTATION = gql`
  mutation seenOrder($input: SeenOrderInput!) {
    seenOrder(input: $input) {
      ok
      error {
        code
        message
      }
    }
  }
`;

interface IProps {
  order: getOrder_getOrder_order;
  refetch: () => void;
}

const OrderDetails: React.FC<IProps> = ({ order, refetch }) => {
  const displayDate = dateGenerator(order.createdAt);
  const [showItemDetails, setShowItemDetails] = useState(false);
  const [showBlockActions, setShowBlockActions] = useState(false);
  const [seenOrderMutation] = useMutation<seenOrder, seenOrderVariables>(
    SEEN_ORDER_MUTATION
  );
  const { updateOrderStatus, loading } = useUpdateOrderStatus();

  const { data } = useMe();
  const roleAction = data?.me
    ? data.me.role === UserRole.RegularUser
      ? orderStatusMap[order.status].userAction
      : orderStatusMap[order.status].restaurantAction
    : undefined;

  const statusDescription = (status: OrderStatusStatus): string =>
    data?.me
      ? orderStatusMap[status][
          data.me.role === UserRole.RegularUser
            ? "userDescription"
            : "restaurantDescription"
        ] || ""
      : "";

  const onBlockSuccess = () => {
    setShowBlockActions(false);
    refetch();
  };
  useEffect(() => {
    if (data?.me) {
      if (
        (data.me.role === UserRole.RegularUser && !order.userSeen) ||
        (data.me.role === UserRole.RestaurantOwner && !order.restaurantSeen)
      )
        seenOrderMutation({ variables: { input: { id: order.id } } });
    }
  }, [order, data, seenOrderMutation]);

  return (
    <div className=" w-full">
      <div className=" w-full flex items-center justify-between sticky top-0 bg-white py-3">
        <div>
          <p className="page-title mb-0">
            #{order.id} | {orderStatusMap[order.status].displayName}
          </p>
          <p className=" small-title mt-1">{displayDate}</p>
        </div>
        {roleAction && (
          <div
            className=" 
          fixed bottom-0 left-0 w-full pb-6 p-3 bg-white
          lg:static lg:w-auto lg:pb-0 lg:p-0"
          >
            <Button
              className=" w-full"
              appearance="primary"
              // @ts-ignore
              intent={roleAction.intent}
              loading={loading}
              onClick={() => updateOrderStatus(order.id)}
            >
              {roleAction.text}
            </Button>
          </div>
        )}
      </div>
      <div className=" w-full flex flex-col lg:flex-row items-start">
        <div className=" w-full lg:pr-3  border-solid border-gray-200 lg:border-r">
          <div className=" w-full">
            <p className=" small-title">Delivery Information</p>
            <div className=" py-2">
              <p className=" text-xs text-gray-600 font-semibold">
                Customer Name
              </p>
              <p className=" text-gray-500 text-sm">{order.user?.name}</p>
            </div>
            <div className=" py-2">
              <p className=" text-xs text-gray-600 font-semibold">Contact No</p>
              <p className=" text-gray-500 text-sm">{order.phoneNo}</p>
            </div>
            <div className=" py-2">
              <p className=" text-xs text-gray-600 font-semibold">
                Delivery Address
              </p>
              <p className=" text-gray-500 text-sm">{order.deliveryAddress}</p>
            </div>
          </div>
          {data?.me?.role === UserRole.RegularUser && (
            <div className=" w-full">
              <p className=" small-title">
                Restaurant{" "}
                {!order.restaurant && (
                  <span className=" font-semibold italic text-gray-600">
                    (Deleted)
                  </span>
                )}
              </p>
              {order.restaurant && (
                <div className=" flex py-2 items-center">
                  {order.restaurant.backgroundImage && (
                    <img
                      alt={order.restaurant.name}
                      className=" h-24 w-24 object-cover rounded-lg"
                      src={order.restaurant.backgroundImage}
                    />
                  )}
                  <div className=" flex flex-1 flex-col pl-3 justify-between">
                    <div className=" w-full">
                      <p className=" font-semibold text-gray-700">
                        {order.restaurant.name}
                      </p>
                      <p className=" text-gray-500 line-clamp-2 text-sm">
                        {order.restaurant.description}
                      </p>
                    </div>
                    {/**TODO: Redirect to '/?restaurant_id=:id' and setRestaurant */}
                    <span className=" link mt-2 text-sm">
                      Browse Restaurant
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
          <div className=" w-full py-3">
            <div className=" w-full flex items-center justify-between">
              <p className={" small-title"}>Ordered Items</p>
              <span
                className="link text-sm"
                onClick={setShowItemDetails.bind(this, !showItemDetails)}
              >
                {showItemDetails ? "Hide Details" : "View Details"}
              </span>
            </div>
            {order.items.map((item) => (
              <OrderItem
                key={`${item.id}`}
                item={item}
                showDescription={showItemDetails}
              />
            ))}
            <div className=" w-full flex items-center justify-between border-solid border-t border-b border-gray-300 py-2 mt-2">
              <p className=" text-gray-600">Total Amount:</p>
              <p className=" font-semibold">${order.price}</p>
            </div>
          </div>
        </div>
        <div className=" w-full lg:w-3/5 px-3 flex flex-col lg:flex-col-reverse">
          <div>
            <p className=" small-title mb-3">Activities</p>
            {order.statusHistory.map((history) => (
              <div
                key={history.id}
                className=" py-2 border-b border-solid border-gray-100"
              >
                <p className=" text-xs text-gray-400">
                  {dateGenerator(history.createdAt)}
                </p>
                <p className=" text-gray-600">
                  {statusDescription(history.status)}
                </p>
              </div>
            ))}
          </div>
          {data?.me?.role === UserRole.RestaurantOwner &&
            order.user &&
            order.restaurant && (
              <div className=" mt-3 lg:mb-3 lg:mt-0">
                <p className=" small-title">Other Actions</p>
                <div className=" py-2">
                  <p className=" text-sm text-gray-500">
                    If you think the customer is malicious or inappropriate, you
                    may block them from ordering from you. You can always
                    unblock them if you change your mind.
                  </p>
                  <div className=" w-full flex items-center justify-end">
                    <Button
                      className=" w-full lg:w-auto mt-3"
                      appearance="primary"
                      intent="danger"
                      onClick={setShowBlockActions.bind(this, true)}
                    >
                      {order.userBlocked ? "Unblock User" : "Block User"}
                    </Button>
                  </div>
                </div>
                <Modal
                  title={order.userBlocked ? "Unblock User" : "Block User"}
                  showModal={showBlockActions}
                >
                  <BlockControl
                    blocked={order.userBlocked}
                    user={order.user}
                    restaurant={order.restaurant}
                    onCancel={setShowBlockActions.bind(this, false)}
                    onSuccess={onBlockSuccess}
                  />
                </Modal>
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
