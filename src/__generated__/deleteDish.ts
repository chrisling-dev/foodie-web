/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteDish
// ====================================================

export interface deleteDish_deleteDish_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface deleteDish_deleteDish_dish_restaurant {
  __typename: "Restaurant";
  id: number;
}

export interface deleteDish_deleteDish_dish {
  __typename: "Dish";
  id: number;
  name: string;
  restaurant: deleteDish_deleteDish_dish_restaurant;
}

export interface deleteDish_deleteDish {
  __typename: "DeleteDishOutput";
  ok: boolean;
  error: deleteDish_deleteDish_error | null;
  dish: deleteDish_deleteDish_dish | null;
}

export interface deleteDish {
  deleteDish: deleteDish_deleteDish;
}

export interface deleteDishVariables {
  input: DeleteDishInput;
}
