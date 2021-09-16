/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myCart
// ====================================================

export interface myCart_myCart_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface myCart_myCart_cart_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  backgroundImage: string | null;
}

export interface myCart_myCart_cart_cartItems_dish {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
}

export interface myCart_myCart_cart_cartItems {
  __typename: "CartItem";
  id: number;
  quantity: number;
  dish: myCart_myCart_cart_cartItems_dish;
}

export interface myCart_myCart_cart {
  __typename: "CartOutput";
  restaurant: myCart_myCart_cart_restaurant | null;
  cartItems: myCart_myCart_cart_cartItems[] | null;
  totalPrice: number;
}

export interface myCart_myCart {
  __typename: "MyCartOutput";
  ok: boolean;
  error: myCart_myCart_error | null;
  cart: myCart_myCart_cart | null;
}

export interface myCart {
  myCart: myCart_myCart;
}
