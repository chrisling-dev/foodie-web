import React from "react";
import Back from "../../components/back/back";
import Loader from "../../components/loader/loader";
import PageContainer from "../../components/page-container/page-container";
import useCart from "../../hooks/useCart";
import coverPhoto from "../../assets/cover-photo.png";
import Input from "../../components/input/input";
import Button from "../../components/button/button";
import CartItem from "../explore/cart/cart-item/cart-item";
import { useForm } from "react-hook-form";
import gql from "graphql-tag";
import { useApolloClient, useMutation } from "@apollo/client";
import {
  createOrder,
  createOrderVariables,
} from "../../__generated__/createOrder";
import ErrorMessage from "../../components/error-message/error-message";
import useNavigate from "../../hooks/useNavigate";
import { MY_CART_QUERY } from "../../context/cart.context";
import { myCart } from "../../__generated__/myCart";

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error {
        code
        message
      }
      orderId
    }
  }
`;

interface IFormProps {
  phoneNo: string;
  deliveryAddress: string;
}

const Checkout = () => {
  const apolloClient = useApolloClient();
  const { toOrder } = useNavigate();
  const { cart, loading, emptyCart } = useCart();
  const { formState, getValues, register } = useForm<IFormProps>({
    mode: "onChange",
  });

  const [createOrderMutation, { data, loading: creatingOrder }] = useMutation<
    createOrder,
    createOrderVariables
  >(CREATE_ORDER_MUTATION, {
    onCompleted(data) {
      if (data.createOrder.orderId) {
        const currentCartData = apolloClient.readQuery<myCart>({
          query: MY_CART_QUERY,
        });
        if (currentCartData && currentCartData.myCart.cart) {
          apolloClient.writeQuery<myCart>({
            query: MY_CART_QUERY,
            data: {
              ...currentCartData,
              myCart: {
                ...currentCartData?.myCart,
                cart: {
                  ...currentCartData?.myCart.cart,
                  restaurant: null,
                  cartItems: [],
                  totalPrice: 0,
                },
              },
            },
          });
        }
        emptyCart();
        toOrder(data.createOrder.orderId);
      }
    },
  });

  const onCreateOrder = () => {
    const { deliveryAddress, phoneNo } = getValues();

    if (deliveryAddress && phoneNo) {
      createOrderMutation({
        variables: {
          input: {
            phoneNo,
            deliveryAddress,
          },
        },
      });
    }
  };
  return (
    <PageContainer>
      <Back />
      <p className=" page-title">Checkout</p>
      {loading ? (
        <Loader />
      ) : cart?.restaurant && cart.cartItems && cart.cartItems.length > 0 ? (
        <div className=" w-full flex flex-col-reverse items-start lg:flex-row ">
          <div className=" w-full mt-6 pt-6 border-t border-solid border-gray-200 lg:pt-0 lg:mt-0 lg:pr-6 lg:mr-6 lg:border-r lg:border-t-0 ">
            <p className=" text-gray-700 font-semibold">Delivery Information</p>
            <Input
              register={register("phoneNo", {
                required: "Please provide a valid phone number",
              })}
              containerClassName="mt-3"
              error={formState.errors.phoneNo?.message}
              label="Contact No"
              prefix={
                <span className=" text-gray-400 px-2 mr-2 border-r border-solid border-gray-200">
                  +60
                </span>
              }
            />
            <Input
              register={register("deliveryAddress", {
                required: "Please enter a delivery address for your order.",
              })}
              containerClassName="mt-3"
              description={`Make sure your address is "google map friendly" for a seamless delivery!`}
              error={formState.errors.deliveryAddress?.message}
              label="Delivery Address"
              placeholder={`e.g. 123, abc street, city, postcode...`}
            />
            <div className=" flex flex-col items-center lg:items-end justify-end pt-4">
              <Button
                className=" w-full lg:w-auto"
                appearance="primary"
                intent="primary"
                disabled={!formState.isValid || creatingOrder}
                onClick={onCreateOrder}
              >
                Place Order
              </Button>
              {data?.createOrder.error ? (
                <ErrorMessage className=" mt-2">
                  {data?.createOrder.error.message}
                </ErrorMessage>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className=" w-full lg:w-3/5 bg-gray-50 rounded-lg p-3 ">
            <p className=" text-gray-700 font-semibold mb-3">Order Details</p>
            <div className=" w-full shadow-md bg-white rounded-lg p-3 flex items-center">
              <img
                alt={cart.restaurant.name}
                className=" w-24 h-24 rounded-lg object-cover"
                src={cart.restaurant.backgroundImage || coverPhoto}
              />
              <div className=" ml-3">
                <p className=" font-semibold text-gray-700">
                  {cart.restaurant.name}
                </p>
                <p className=" line-clamp-2 text-gray-500">
                  {cart.restaurant.description}
                </p>
              </div>
            </div>
            <div className=" mt-3">
              {cart.cartItems.map((item) => (
                <CartItem key={`${item.id}`} item={item} />
              ))}
            </div>
            <div className=" flex items-center justify-between pt-3 mt-3 border-t border-solid border-gray-200 p-2">
              <p className=" text-gray-500">Total Amount:</p>
              <p className=" font-semibold">${cart.totalPrice.toFixed(2)}</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You don't have anything in your cart!</p>
        </div>
      )}
    </PageContainer>
  );
};

export default Checkout;
