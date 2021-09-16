import React from "react";
import { useState } from "react";
import { myCart_myCart_cart_cartItems } from "../../../../__generated__/myCart";

interface IProps {
  item: myCart_myCart_cart_cartItems;
}
const CartItem: React.FC<IProps> = ({ item }) => {
  const [editing, setEditing] = useState(false);

  return (
    <div className=" w-full p-3 border-b border-solid border-gray-100 flex items-center justify-between">
      <div>
        <p className=" text-sm text-gray-500">{item.dish.name}</p>
        <p className=" text-sm font-semibold">${item.dish.price}</p>
      </div>
      <div className=" px-3 relative">
        <div
          className={` z-50 w-full h-full absolute  flex flex-col items-center justify-center top-0 left-0 transform-300
        ${editing ? " opacity-100 " : " opacity-0 pointer-events-none"}
        `}
        >
          <div className=" flex items-center bg-white shadow-md rounded-md border border-solid border-primary overflow-hidden">
            <p className=" h-full border-r border-solid border-primary px-1 cursor-pointer hover:bg-blue-50">
              +
            </p>
            <p className=" mx-2">{item.quantity}</p>
            <p className=" h-full border-l border-solid border-primary px-1 cursor-pointer hover:bg-blue-50">
              -
            </p>
          </div>
          <p
            className=" text-xs text-primary mt-1 cursor-pointer hover:opacity-70 transform-300"
            onClick={setEditing.bind(this, false)}
          >
            Cancel
          </p>
        </div>
        <p>x {item.quantity}</p>
        <p
          className=" text-xs cursor-pointer text-primary hover:opacity-70 transform-300 mt-1"
          onClick={setEditing.bind(this, true)}
        >
          Edit
        </p>
      </div>
      <div
        className={`fixed top-0 left-0 w-screen h-screen bg-gray-700 bg-opacity-70 z-40 
        ${editing ? " bg-opacity-70" : " bg-opacity-0 pointer-events-none"}`}
        onClick={setEditing.bind(this, false)}
      />
    </div>
  );
};

export default CartItem;
