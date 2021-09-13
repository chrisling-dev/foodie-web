/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myRestaurant
// ====================================================

export interface myRestaurant_myRestaurant_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface myRestaurant_myRestaurant_restaurant_dishes {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  description: string | null;
  photo: string | null;
}

export interface myRestaurant_myRestaurant_restaurant {
  __typename: "RestaurantDetails";
  id: number;
  name: string;
  description: string;
  backgroundImage: string | null;
  dishes: myRestaurant_myRestaurant_restaurant_dishes[];
}

export interface myRestaurant_myRestaurant {
  __typename: "MyRestaurantOutput";
  ok: boolean;
  error: myRestaurant_myRestaurant_error | null;
  restaurant: myRestaurant_myRestaurant_restaurant | null;
}

export interface myRestaurant {
  myRestaurant: myRestaurant_myRestaurant;
}

export interface myRestaurantVariables {
  input: MyRestaurantInput;
}
