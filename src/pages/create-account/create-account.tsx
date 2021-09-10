import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import ErrorMessage from "../../components/error-message/error-message";
import useHideHeader from "../../hooks/useHideHeader";
import {
  createAccount,
  createAccountVariables,
} from "../../__generated__/createAccount";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { AUTH_TOKEN } from "../../utils/constants";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      ok
      accessToken
      error {
        code
        message
      }
    }
  }
`;

interface CreateAccountFormProps {
  email: string;
  password: string;
  name: string;
}
const CreateAccount = () => {
  useHideHeader();
  const history = useHistory();
  const [createAccountMutation, { loading, data }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, {
    onCompleted: (data) => {
      const accessToken = data.createAccount.accessToken;
      if (accessToken) {
        localStorage.setItem(AUTH_TOKEN, accessToken);
        authTokenVar(accessToken);
        isLoggedInVar(true);
        history.push("/");
      }
    },
  });

  const { formState, getValues, register } = useForm<CreateAccountFormProps>({
    mode: "onChange",
  });

  const navigateToSignIn = () => history.push("/sign-in");

  const onCreateAccount = (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) => {
    if (e) e.preventDefault();
    const { email, name, password } = getValues();
    try {
      createAccountMutation({
        variables: { input: { email, name, password } },
      });
    } catch (error) {
      // log error with sentry or other logging tools
    }
  };
  return (
    <div className=" min-w-screen min-h-screen bg-blue-50 flex flex-col items-center">
      <div className="mb-20 w-full bg-primary p-4 flex items-center justify-center">
        <Logo color="white" />
      </div>
      <div className=" w-full p-4 flex items-center justify-center">
        <div className=" form-box">
          <p
            className=" w-max text-xs mb-2 cursor-pointer text-gray-400 hover:text-gray-600"
            onClick={history.goBack}
          >
            &larr; Back
          </p>
          <h1 className=" font-semibold text-primary text-xl mb-3">
            Create Account
          </h1>
          <form onSubmit={onCreateAccount}>
            <Input
              register={register("name", {
                required: "Please enter your name.",
              })}
              containerClassName=" mb-3"
              error={formState.errors.name?.message || ""}
              label="Name"
              placeholder={"e.g. John Doe"}
            />
            <Input
              register={register("email", {
                required: "Please enter a valid e-mail.",
                pattern:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
              containerClassName=" mb-3"
              error={formState.errors.email?.message || ""}
              label="E-mail"
              placeholder={"e.g. john@doe.com"}
            />
            <Input
              register={register("password", {
                required: "Enter a password with minimum 6 characters",
                minLength: 6,
              })}
              containerClassName=" mb-6"
              error={formState.errors.password?.message || ""}
              label="Password"
              placeholder="******"
              type="password"
            />
            <Button
              appearance="primary"
              className=" w-full"
              disabled={!formState.isValid || loading}
              intent="primary"
              onClick={onCreateAccount}
            >
              Create Account
            </Button>
            {data?.createAccount.error ? (
              <ErrorMessage className={" mt-2"}>
                {data.createAccount.error.message}
              </ErrorMessage>
            ) : (
              ""
            )}
          </form>

          <p className=" text-center mt-8 text-sm text-gray-400">
            Already have an account?{" "}
            <span
              className=" text-primary cursor-pointer hover:opacity-80 transform-300"
              onClick={navigateToSignIn}
            >
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
