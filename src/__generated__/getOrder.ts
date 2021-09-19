/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrderInput, OrderStatusStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrder
// ====================================================

export interface getOrder_getOrder_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface getOrder_getOrder_order_items_dish {
  __typename: "Dish";
  id: number;
  name: string;
}

export interface getOrder_getOrder_order_items {
  __typename: "OrderItem";
  id: number;
  description: string | null;
  name: string;
  photo: string | null;
  price: number;
  quantity: number;
  dish: getOrder_getOrder_order_items_dish | null;
}

export interface getOrder_getOrder_order_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  backgroundImage: string | null;
}

export interface getOrder_getOrder_order_statusHistory_user {
  __typename: "User";
  id: number;
  name: string;
  role: UserRole;
}

export interface getOrder_getOrder_order_statusHistory {
  __typename: "OrderStatusHistory";
  id: number;
  createdAt: any;
  status: OrderStatusStatus;
  user: getOrder_getOrder_order_statusHistory_user | null;
}

export interface getOrder_getOrder_order_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface getOrder_getOrder_order {
  __typename: "OrderWithStatus";
  id: number;
  createdAt: any;
  price: number;
  status: OrderStatusStatus;
  deliveryAddress: string;
  phoneNo: string;
  items: getOrder_getOrder_order_items[];
  restaurant: getOrder_getOrder_order_restaurant | null;
  statusHistory: getOrder_getOrder_order_statusHistory[];
  user: getOrder_getOrder_order_user | null;
}

export interface getOrder_getOrder {
  __typename: "GetOrderOutput";
  ok: boolean;
  error: getOrder_getOrder_error | null;
  order: getOrder_getOrder_order | null;
}

export interface getOrder {
  getOrder: getOrder_getOrder;
}

export interface getOrderVariables {
  input: GetOrderInput;
}
