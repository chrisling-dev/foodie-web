import React from "react";
import useMe from "../../hooks/queries/useMe";
import { getOrder_getOrder_order } from "../../__generated__/getOrder";
import { UserRole } from "../../__generated__/globalTypes";
import Button from "../button/button";
import { orderStatusMap } from "./order-status.map";

interface IProps {
  order: getOrder_getOrder_order;
}
const OrderDetails: React.FC<IProps> = ({ order }) => {
  const date = new Date(order.createdAt);
  const displayDate = `${date.toLocaleDateString()} | ${date.toLocaleTimeString()}`;

  const { data } = useMe();
  const roleAction = data?.me
    ? data.me.role === UserRole.RegularUser
      ? orderStatusMap[order.status].userAction
      : orderStatusMap[order.status].restaurantAction
    : undefined;
  return (
    <div className=" w-full">
      <div className=" w-full flex items-center justify-between sticky top-0 bg-white py-3">
        <div>
          <p className="page-title mb-0">
            #{order.id} | {orderStatusMap[order.status].displayName}
          </p>
          <p className=" text-gray-400 text-sm mt-1">{displayDate}</p>
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
            >
              {roleAction.text}
            </Button>
          </div>
        )}
      </div>
      <div className=" w-full flex items-start">
        <div className=" w-full">
          <div className=" py-3">
            <p className=" text-gray-400 text-sm">
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
                    <p className=" text-gray-500 line-clamp-1">
                      {order.restaurant.description}
                    </p>
                  </div>
                  {/**TODO: Redirect to '/?restaurant_id=:id' and setRestaurant */}
                  <span className=" link mt-2 text-sm">Browse Restaurant</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
