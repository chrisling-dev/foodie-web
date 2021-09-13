/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  RegularUser = "RegularUser",
  RestaurantOwner = "RestaurantOwner",
}

export interface AddDishInput {
  name: string;
  description?: string | null;
  price: number;
  photo?: string | null;
  restaurantId: number;
}

export interface CreateAccountInput {
  email: string;
  password: string;
  name: string;
}

export interface CreateRestaurantInput {
  name: string;
  description: string;
  backgroundImage?: string | null;
}

export interface MyRestaurantInput {
  id: number;
}

export interface SignInInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
