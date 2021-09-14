/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateDish
// ====================================================

export interface updateDish_updateDish_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface updateDish_updateDish_dish {
  __typename: "Dish";
  id: number;
  name: string;
  description: string | null;
  price: number;
  photo: string | null;
}

export interface updateDish_updateDish {
  __typename: "UpdateDishOutput";
  ok: boolean;
  error: updateDish_updateDish_error | null;
  dish: updateDish_updateDish_dish | null;
}

export interface updateDish {
  updateDish: updateDish_updateDish;
}

export interface updateDishVariables {
  input: UpdateDishInput;
}
