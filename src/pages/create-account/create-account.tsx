import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import useHideHeader from "../../hooks/useHideHeader";

const CreateAccount = () => {
  useHideHeader();
  const history = useHistory();

  const navigateToSignIn = () => history.push("/sign-in");
  return (
    <div className=" min-w-screen min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="mb-20 w-full bg-primary p-4 flex items-center justify-center">
        <Logo color="white" />
      </div>
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
        <form>
          <Input
            containerClassName=" mb-3"
            label="Name"
            placeholder={"e.g. John Doe"}
          />
          <Input
            containerClassName=" mb-3"
            label="E-mail"
            placeholder={"e.g. john@doe.com"}
          />
          <Input
            containerClassName=" mb-6"
            label="Password"
            placeholder="******"
            type="password"
          />
          <Button className=" w-full" appearance="primary" intent="primary">
            Create Account
          </Button>
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
  );
};

export default CreateAccount;
