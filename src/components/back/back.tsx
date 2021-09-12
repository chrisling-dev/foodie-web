import { useHistory } from "react-router";

const Back = () => {
  const history = useHistory();

  return (
    <p
      className=" w-max text-xs mb-2 cursor-pointer text-gray-400 hover:text-gray-600"
      onClick={history.goBack}
    >
      &larr; Back
    </p>
  );
};

export default Back;
