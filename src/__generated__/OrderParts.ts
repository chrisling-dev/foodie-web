/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatusStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL fragment: OrderParts
// ====================================================

export interface OrderParts_items_dish {
  __typename: "Dish";
  id: number;
  name: string;
}

export interface OrderParts_items {
  __typename: "OrderItem";
  id: number;
  description: string | null;
  name: string;
  photo: string | null;
  price: number;
  quantity: number;
  dish: OrderParts_items_dish | null;
}

export interface OrderParts_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  backgroundImage: string | null;
}

export interface OrderParts_statusHistory_user {
  __typename: "User";
  id: number;
  name: string;
  role: UserRole;
}

export interface OrderParts_statusHistory {
  __typename: "OrderStatusHistory";
  id: number;
  createdAt: any;
  status: OrderStatusStatus;
  user: OrderParts_statusHistory_user | null;
}

export interface OrderParts {
  __typename: "OrderWithStatus";
  id: number;
  createdAt: any;
  price: number;
  status: OrderStatusStatus;
  items: OrderParts_items[];
  restaurant: OrderParts_restaurant | null;
  statusHistory: OrderParts_statusHistory[];
}
