/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createRestaurant
// ====================================================

export interface createRestaurant_createRestaurant_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface createRestaurant_createRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  backgroundImage: string | null;
  orderCounts: number;
}

export interface createRestaurant_createRestaurant {
  __typename: "CreateRestaurantOutput";
  ok: boolean;
  error: createRestaurant_createRestaurant_error | null;
  restaurant: createRestaurant_createRestaurant_restaurant | null;
}

export interface createRestaurant {
  createRestaurant: createRestaurant_createRestaurant;
}

export interface createRestaurantVariables {
  input: CreateRestaurantInput;
}
