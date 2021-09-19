/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrdersInput, OrderStatusStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrders
// ====================================================

export interface getOrders_getOrders_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface getOrders_getOrders_orders_items_dish {
  __typename: "Dish";
  id: number;
  name: string;
}

export interface getOrders_getOrders_orders_items {
  __typename: "OrderItem";
  id: number;
  description: string | null;
  name: string;
  photo: string | null;
  price: number;
  quantity: number;
  dish: getOrders_getOrders_orders_items_dish | null;
}

export interface getOrders_getOrders_orders_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  backgroundImage: string | null;
}

export interface getOrders_getOrders_orders_statusHistory_user {
  __typename: "User";
  id: number;
  name: string;
  role: UserRole;
}

export interface getOrders_getOrders_orders_statusHistory {
  __typename: "OrderStatusHistory";
  id: number;
  createdAt: any;
  status: OrderStatusStatus;
  user: getOrders_getOrders_orders_statusHistory_user | null;
}

export interface getOrders_getOrders_orders_user {
  __typename: "User";
  id: number;
  name: string;
}

export interface getOrders_getOrders_orders {
  __typename: "OrderWithStatus";
  id: number;
  createdAt: any;
  price: number;
  status: OrderStatusStatus;
  deliveryAddress: string;
  phoneNo: string;
  userSeen: boolean;
  restaurantSeen: boolean;
  items: getOrders_getOrders_orders_items[];
  restaurant: getOrders_getOrders_orders_restaurant | null;
  statusHistory: getOrders_getOrders_orders_statusHistory[];
  user: getOrders_getOrders_orders_user | null;
}

export interface getOrders_getOrders_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
}

export interface getOrders_getOrders {
  __typename: "GetOrdersOutput";
  ok: boolean;
  error: getOrders_getOrders_error | null;
  orders: getOrders_getOrders_orders[] | null;
  restaurant: getOrders_getOrders_restaurant | null;
}

export interface getOrders {
  getOrders: getOrders_getOrders;
}

export interface getOrdersVariables {
  input?: GetOrdersInput | null;
}
