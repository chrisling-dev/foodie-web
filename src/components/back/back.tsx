import { useHistory } from "react-router";

interface IProps {
  path?: string;
  onClick?: () => void;
}
const Back: React.FC<IProps> = ({ path, onClick }) => {
  const history = useHistory();

  return (
    <p
      className=" w-max text-xs mb-2 cursor-pointer text-gray-400 hover:text-gray-600"
      onClick={
        onClick ? onClick : path ? () => history.replace(path) : history.goBack
      }
    >
      &larr; Back
    </p>
  );
};

export default Back;
