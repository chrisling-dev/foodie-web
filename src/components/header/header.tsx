import { useContext } from "react";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/logo";
import headerContext from "../../context/header.context";
import SearchBar from "./search-bar/search-bar";

const Header = () => {
  const { isHeaderShown } = useContext(headerContext);
  const history = useHistory();
  return (
    <div
      className={` ${
        isHeaderShown ? " h-16" : " h-0 overflow-hidden"
      } sticky top-0 w-full flex items-center justify-between
      bg-white shadow-md px-4
      transform duration-300`}
    >
      <Logo />
      <SearchBar />
      <p className=" min-w-max" onClick={() => history.push("/sign-in")}>
        Sign In
      </p>
    </div>
  );
};

export default Header;
