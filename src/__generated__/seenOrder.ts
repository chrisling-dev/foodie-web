/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SeenOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: seenOrder
// ====================================================

export interface seenOrder_seenOrder_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface seenOrder_seenOrder {
  __typename: "SeenOrderOutput";
  ok: boolean;
  error: seenOrder_seenOrder_error | null;
}

export interface seenOrder {
  seenOrder: seenOrder_seenOrder;
}

export interface seenOrderVariables {
  input: SeenOrderInput;
}
