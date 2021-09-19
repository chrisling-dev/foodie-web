/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { BlockUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: blockUser
// ====================================================

export interface blockUser_blockUser_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface blockUser_blockUser {
  __typename: "BlockUserOutput";
  ok: boolean;
  error: blockUser_blockUser_error | null;
}

export interface blockUser {
  blockUser: blockUser_blockUser;
}

export interface blockUserVariables {
  input: BlockUserInput;
}
