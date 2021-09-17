import React from "react";
import { useState } from "react";
import Button from "../../../components/button/button";
import ErrorMessage from "../../../components/error-message/error-message";
import Loader from "../../../components/loader/loader";
import useCart from "../../../hooks/useCart";
import CartItem from "./cart-item/cart-item";

interface IProps {
  className?: string;
}
const Cart: React.FC<IProps> = ({ className }) => {
  const [showCart, setShowCart] = useState(false);
  const { addingToCart, cart, error, loading } = useCart();
  return (
    <div
      className={`
    fixed w-full bottom-0 left-0
    lg:sticky lg:top-0 lg:bottom-auto lg:left-auto lg:max-w-sm lg:w-3/5 z-40
  ${className}`}
    >
      <div className=" z-20 w-full relative">
        <div
          className={`
          w-full bg-white rounded-t-lg overflow-hidden transform-300
          ${showCart ? " h-70vh" : " h-0"}
          lg:h-70vh lg:mt-4 lg:ml-3 lg:bg-opacity-0 lg:border lg:border-solid lg:border-gray- lg:rounded-lg
        `}
        >
          <div className=" w-full h-full flex flex-col justify-between">
            <div className=" flex flex-1 flex-col overflow-hidden">
              <div>
                <p className=" font-semibold text-gray-700 text-lg border-b border-solid border-gray-100 p-2 lg:p-3 lg:pb-1">
                  My Cart
                </p>
                {cart?.restaurant && (
                  <div className=" w-full p-2 shadow-md">
                    <p className=" font-semibold text-gray-700 text-sm truncate">
                      {cart.restaurant.name}
                    </p>
                    <p className=" text-gray-500 text-xs truncate italic">
                      {cart.restaurant.description}
                    </p>
                  </div>
                )}
              </div>
              <div className=" h-full overflow-y-auto relative">
                {addingToCart && (
                  <div className=" w-full h-full bg-white bg-opacity-70 flex items-center justify-center absolute z-30">
                    <Loader />
                  </div>
                )}
                {!loading &&
                  cart?.cartItems &&
                  (cart.cartItems.length > 0 ? (
                    cart.cartItems.map((item) => (
                      <CartItem item={item} key={`${item.id}`} />
                    ))
                  ) : (
                    <div className=" w-full h-full flex items-center justify-center p-4">
                      <p className=" text-gray-400 text-center">
                        You don't have anything in cart yet!
                      </p>
                    </div>
                  ))}
                {error && (
                  <div className="w-full flex items-center justify-center p-4">
                    <ErrorMessage>{error?.message}</ErrorMessage>
                  </div>
                )}
              </div>
            </div>
            <div className=" w-full flex items-center justify-between p-2 lg:p-3 border-t border-solid border-gray-100">
              <div>
                <p className=" text-gray-500">Total Amount</p>
                <p className=" font-semibold text-gray-600">
                  ${(cart?.totalPrice || 0.0).toFixed(2)}
                </p>
              </div>
              <Button intent={"primary"} appearance={"primary"}>
                Checkout &rarr;
              </Button>
            </div>
          </div>
        </div>
        <div className={` w-full bg-primary p-3 lg:hidden`}>
          <p
            className=" text-white pb-4 lg:hidden"
            onClick={setShowCart.bind(this, !showCart)}
          >
            {showCart ? "Continue Browsing" : "View Cart"} &rarr;
          </p>
        </div>
      </div>
      <div
        className={` lg:hidden z-10 fixed top-0 left-0 h-screen w-full bg-gray-700 transform-300 ${
          showCart ? "bg-opacity-70" : "pointer-events-none bg-opacity-0"
        }`}
        onClick={setShowCart.bind(this, false)}
      />
    </div>
  );
};

export default Cart;
