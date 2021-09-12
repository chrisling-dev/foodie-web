/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: switchToRestaurantOwner
// ====================================================

export interface switchToRestaurantOwner_switchToRestaurantOwner_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface switchToRestaurantOwner_switchToRestaurantOwner {
  __typename: "CoreOutput";
  ok: boolean;
  error: switchToRestaurantOwner_switchToRestaurantOwner_error | null;
}

export interface switchToRestaurantOwner {
  switchToRestaurantOwner: switchToRestaurantOwner_switchToRestaurantOwner;
}
