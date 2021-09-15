/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { DeleteRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: deleteRestaurant
// ====================================================

export interface deleteRestaurant_deleteRestaurant_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface deleteRestaurant_deleteRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
}

export interface deleteRestaurant_deleteRestaurant {
  __typename: "DeleteRestaurantOutput";
  ok: boolean;
  error: deleteRestaurant_deleteRestaurant_error | null;
  restaurant: deleteRestaurant_deleteRestaurant_restaurant | null;
}

export interface deleteRestaurant {
  deleteRestaurant: deleteRestaurant_deleteRestaurant;
}

export interface deleteRestaurantVariables {
  input: DeleteRestaurantInput;
}
