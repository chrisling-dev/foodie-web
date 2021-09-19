import React from "react";
import { getOrder_getOrder_order_items } from "../../../__generated__/getOrder";

interface IProps {
  item: getOrder_getOrder_order_items;
  showDescription?: boolean;
}
const OrderItem: React.FC<IProps> = ({ item, showDescription }) => {
  return (
    <div className=" w-full py-3 flex items-center">
      {item.photo && (
        <img
          alt={item.name}
          className=" h-20 w-20 object-cover rounded-lg"
          src={item.photo}
        />
      )}
      <div className=" flex flex-1 flex-col px-3">
        <p className=" text-gray-700 font-semibold text-sm">
          {item.name}
          {!item.id && (
            <span className=" text-gray-500 italic"> (Deleted)</span>
          )}
        </p>
        {showDescription && (
          <div className=" text-sm">
            <p className=" text-gray-500 mb-2 line-clamp-1">
              {item.description}
            </p>
            <p>${item.price}</p>
          </div>
        )}
      </div>
      <div className=" w-10">
        <p className=" text-center">x {item.quantity}</p>
      </div>
    </div>
  );
};

export default OrderItem;
