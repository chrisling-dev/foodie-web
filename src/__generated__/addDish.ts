/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AddDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: addDish
// ====================================================

export interface addDish_addDish_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface addDish_addDish_dish {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  description: string | null;
  photo: string | null;
}

export interface addDish_addDish {
  __typename: "AddDishOutput";
  ok: boolean;
  error: addDish_addDish_error | null;
  dish: addDish_addDish_dish | null;
}

export interface addDish {
  addDish: addDish_addDish;
}

export interface addDishVariables {
  input: AddDishInput;
}
