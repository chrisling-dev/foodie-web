/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myRestaurants
// ====================================================

export interface myRestaurants_myRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  description: string;
  backgroundImage: string | null;
  orderCounts: number;
}

export interface myRestaurants_myRestaurants {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  restaurants: myRestaurants_myRestaurants_restaurants[];
}

export interface myRestaurants {
  myRestaurants: myRestaurants_myRestaurants;
}
