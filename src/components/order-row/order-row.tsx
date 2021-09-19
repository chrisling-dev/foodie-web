import React from "react";
import useMe from "../../hooks/queries/useMe";
import useNavigate from "../../hooks/useNavigate";
import { orderStatusMap } from "../../utils/order-status.map";
import { getOrder_getOrder_order_items } from "../../__generated__/getOrder";
import { getOrders_getOrders_orders } from "../../__generated__/getOrders";
import { UserRole } from "../../__generated__/globalTypes";
import Notification from "../notification/notification";

interface IProps {
  order: getOrders_getOrders_orders;
}
//export for testing later
export const calcItemsCount = (items: getOrder_getOrder_order_items[]) => {
  return items.reduce((sum, item) => sum + item.quantity, 0);
};

const OrderRow: React.FC<IProps> = ({ order }) => {
  const { toOrder } = useNavigate();
  const { data } = useMe();

  const notifyUser =
    data?.me?.role === UserRole.RegularUser
      ? !order.userSeen
      : !order.restaurantSeen;

  const itemCount = calcItemsCount(order.items);
  return (
    <div
      className={`w-full rounded-lg cursor-pointer shadow-md hover:shadow-lg p-3 transform-300 relative border border-solid ${
        notifyUser ? "border-primary" : "border-gray-100"
      }`}
      onClick={() => toOrder(order.id)}
    >
      <div className=" w-full flex items-center justify-between">
        <div>
          <p
            className={` font-semibold  text-sm ${
              notifyUser ? "text-primary" : "text-gray-400"
            }`}
          >
            {orderStatusMap[order.status].displayName}
          </p>
          <p className=" font-semibold text-gray-700">
            {order.restaurant ? (
              order.restaurant.name
            ) : (
              <span className=" text-gray-500 italic ">
                Restaurant has been deleted
              </span>
            )}
          </p>
          <p className=" mt-2 text-gray-500">
            Total: <span className=" font-semibold">${order.price}</span>
          </p>
        </div>
        <div className=" text-center flex flex-col items-center justify-center">
          <p className=" text-gray-500 font-semibold">{itemCount}</p>
          <p className=" text-gray-400 text-xs">item{itemCount > 1 && "s"}</p>
        </div>
      </div>
      <div className=" absolute top-0 right-0 transform -translate-y-1/2 translate-x-0.5">
        {notifyUser && <Notification />}
      </div>
    </div>
  );
};

export default OrderRow;
