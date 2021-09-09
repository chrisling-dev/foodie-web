import { useContext } from "react";
import { useHistory } from "react-router-dom";
import headerContext from "../../context/header.context";

const Header = () => {
  const { isHeaderShown } = useContext(headerContext);
  const history = useHistory();
  return (
    <div
      className={` ${
        isHeaderShown ? " h-12" : " h-0 overflow-hidden"
      } sticky top-0 w-full flex items-center justify-between transform duration-300`}
    >
      <p>Foodie</p>
      <p onClick={() => history.push("/sign-in")}>Sign In</p>
    </div>
  );
};

export default Header;
