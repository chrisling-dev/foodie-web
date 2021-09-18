/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateOrderStatusInput, OrderStatusStatus, UserRole } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateOrderStatus
// ====================================================

export interface updateOrderStatus_updateOrderStatus_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface updateOrderStatus_updateOrderStatus_status_user {
  __typename: "User";
  id: number;
  name: string;
  role: UserRole;
}

export interface updateOrderStatus_updateOrderStatus_status {
  __typename: "OrderStatusHistory";
  id: number;
  createdAt: any;
  status: OrderStatusStatus;
  user: updateOrderStatus_updateOrderStatus_status_user | null;
}

export interface updateOrderStatus_updateOrderStatus {
  __typename: "UpdateOrderStatusOutput";
  ok: boolean;
  error: updateOrderStatus_updateOrderStatus_error | null;
  status: updateOrderStatus_updateOrderStatus_status | null;
}

export interface updateOrderStatus {
  updateOrderStatus: updateOrderStatus_updateOrderStatus;
}

export interface updateOrderStatusVariables {
  input: UpdateOrderStatusInput;
}
