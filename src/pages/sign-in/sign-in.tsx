import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import ErrorMessage from "../../components/error-message/error-message";
import useHideHeader from "../../hooks/useHideHeader";
import { authTokenVar, isLoggedInVar } from "../../apollo";
import { AUTH_TOKEN } from "../../utils/constants";
import { signIn, signInVariables } from "../../__generated__/signIn";
import Back from "../../components/back/back";

const SIGN_IN_MUTATION = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) {
      ok
      accessToken
      error {
        code
        message
      }
    }
  }
`;

interface SignInFormProps {
  email: string;
  password: string;
}
const SignIn = () => {
  useHideHeader();
  const history = useHistory();
  const [signInMutation, { loading, data }] = useMutation<
    signIn,
    signInVariables
  >(SIGN_IN_MUTATION, {
    onCompleted: (data) => {
      const accessToken = data.signIn.accessToken;
      if (accessToken) {
        localStorage.setItem(AUTH_TOKEN, accessToken);
        authTokenVar(accessToken);
        isLoggedInVar(true);
        history.push("/");
      }
    },
  });

  const { formState, getValues, register } = useForm<SignInFormProps>({
    mode: "onChange",
  });

  const navigateToCreateAccount = () => history.push("/create-account");

  const onSignIn = (
    e: React.FormEvent<HTMLFormElement> | React.FormEvent<HTMLButtonElement>
  ) => {
    if (e) e.preventDefault();
    const { email, password } = getValues();
    try {
      signInMutation({
        variables: { input: { email, password } },
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
          <Back />
          <h1 className=" font-semibold text-primary text-xl mb-3">Sign In</h1>
          <form onSubmit={onSignIn}>
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
                required: "Enter your password to continue.",
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
              onClick={onSignIn}
            >
              Sign In
            </Button>
            {data?.signIn.error ? (
              <ErrorMessage className={" p-3"}>
                {data.signIn.error.message}
              </ErrorMessage>
            ) : (
              ""
            )}
          </form>

          <p className=" text-center mt-8 text-sm text-gray-400">
            Don't have account yet?{" "}
            <span
              className=" text-primary cursor-pointer hover:opacity-80 transform-300"
              onClick={navigateToCreateAccount}
            >
              Create account
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
