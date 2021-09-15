/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UpdateRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: updateRestaurant
// ====================================================

export interface updateRestaurant_updateRestaurant_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface updateRestaurant_updateRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  backgroundImage: string | null;
}

export interface updateRestaurant_updateRestaurant {
  __typename: "UpdateRestaurantOutput";
  ok: boolean;
  error: updateRestaurant_updateRestaurant_error | null;
  restaurant: updateRestaurant_updateRestaurant_restaurant | null;
}

export interface updateRestaurant {
  updateRestaurant: updateRestaurant_updateRestaurant;
}

export interface updateRestaurantVariables {
  input: UpdateRestaurantInput;
}
