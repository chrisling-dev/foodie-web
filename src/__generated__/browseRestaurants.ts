/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BrowseRestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: browseRestaurants
// ====================================================

export interface browseRestaurants_browseRestaurants_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface browseRestaurants_browseRestaurants_restaurants_dishes {
  __typename: "Dish";
  description: string | null;
  id: number;
  photo: string | null;
  price: number;
  name: string;
}

export interface browseRestaurants_browseRestaurants_restaurants {
  __typename: "Restaurant";
  backgroundImage: string | null;
  description: string;
  id: number;
  name: string;
  dishes: browseRestaurants_browseRestaurants_restaurants_dishes[];
}

export interface browseRestaurants_browseRestaurants {
  __typename: "BrowseRestaurantsOutput";
  ok: boolean;
  error: browseRestaurants_browseRestaurants_error | null;
  restaurants: browseRestaurants_browseRestaurants_restaurants[] | null;
}

export interface browseRestaurants {
  browseRestaurants: browseRestaurants_browseRestaurants;
}

export interface browseRestaurantsVariables {
  input: BrowseRestaurantsInput;
}
