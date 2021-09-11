/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SignInInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: signIn
// ====================================================

export interface signIn_signIn_error {
  __typename: "CoreError";
  code: string;
  message: string;
}

export interface signIn_signIn {
  __typename: "SignInOutput";
  ok: boolean;
  accessToken: string | null;
  error: signIn_signIn_error | null;
}

export interface signIn {
  signIn: signIn_signIn;
}

export interface signInVariables {
  input: SignInInput;
}
