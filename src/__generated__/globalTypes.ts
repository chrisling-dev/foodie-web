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

export interface CreateAccountInput {
  email: string;
  password: string;
  name: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
