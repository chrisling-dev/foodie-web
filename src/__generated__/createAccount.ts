/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAccountInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createAccount
// ====================================================

export interface createAccount_createAccount_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface createAccount_createAccount {
  __typename: "CreateAccountOutput";
  ok: boolean;
  accessToken: string | null;
  error: createAccount_createAccount_error | null;
}

export interface createAccount {
  createAccount: createAccount_createAccount;
}

export interface createAccountVariables {
  input: CreateAccountInput;
}
