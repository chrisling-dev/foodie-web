/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatusStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL fragment: OrderParts
// ====================================================

export interface OrderParts_statusHistory_user {
  __typename: "User";
  id: number;
  name: string;
  role: UserRole;
}

export interface OrderParts_statusHistory {
  __typename: "OrderStatusHistory";
  id: number;
  status: OrderStatusStatus;
  user: OrderParts_statusHistory_user | null;
}

export interface OrderParts_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  backgroundImage: string | null;
}

export interface OrderParts_items_dish {
  __typename: "Dish";
  id: number;
  name: string;
}

export interface OrderParts_items {
  __typename: "OrderItem";
  id: number;
  name: string;
  quantity: number;
  price: number;
  photo: string | null;
  dish: OrderParts_items_dish | null;
}

export interface OrderParts {
  __typename: "OrderWithStatus";
  id: number;
  price: number;
  status: OrderStatusStatus;
  statusHistory: OrderParts_statusHistory[];
  restaurant: OrderParts_restaurant | null;
  items: OrderParts_items[];
}
