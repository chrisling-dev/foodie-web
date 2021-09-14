/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetDishByIdInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: getDishById
// ====================================================

export interface getDishById_getDishById_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface getDishById_getDishById_dish {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  description: string | null;
  photo: string | null;
}

export interface getDishById_getDishById {
  __typename: "GetDishByIdOutput";
  ok: boolean;
  error: getDishById_getDishById_error | null;
  dish: getDishById_getDishById_dish | null;
}

export interface getDishById {
  getDishById: getDishById_getDishById;
}

export interface getDishByIdVariables {
  input: GetDishByIdInput;
}
