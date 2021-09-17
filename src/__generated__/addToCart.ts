/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddToCartInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addToCart
// ====================================================

export interface addToCart_addToCart_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface addToCart_addToCart_cart_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  backgroundImage: string | null;
}

export interface addToCart_addToCart_cart_cartItems_dish {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string | null;
}

export interface addToCart_addToCart_cart_cartItems {
  __typename: "CartItem";
  id: number;
  quantity: number;
  dish: addToCart_addToCart_cart_cartItems_dish;
}

export interface addToCart_addToCart_cart {
  __typename: "CartOutput";
  restaurant: addToCart_addToCart_cart_restaurant | null;
  cartItems: addToCart_addToCart_cart_cartItems[] | null;
  totalPrice: number;
}

export interface addToCart_addToCart {
  __typename: "AddToCartOutput";
  ok: boolean;
  error: addToCart_addToCart_error | null;
  cart: addToCart_addToCart_cart | null;
}

export interface addToCart {
  addToCart: addToCart_addToCart;
}

export interface addToCartVariables {
  input: AddToCartInput;
}
