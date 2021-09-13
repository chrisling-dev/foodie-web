import { useHistory } from "react-router";

interface IProps {
  path?: string;
}
const Back: React.FC<IProps> = ({ path }) => {
  const history = useHistory();

  return (
    <p
      className=" w-max text-xs mb-2 cursor-pointer text-gray-400 hover:text-gray-600"
      onClick={path ? () => history.replace(path) : history.goBack}
    >
      &larr; Back
    </p>
  );
};

export default Back;
