import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import Logo from "../../assets/logo";
import headerContext from "../../context/header.context";
import Button from "../button/button";
import SearchBar from "./search-bar/search-bar";
import { useState } from "react";

const Header = () => {
  const { isHeaderShown } = useContext(headerContext);
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const toggleShowMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    if (!isHeaderShown) setShowMenu(false);
  }, [isHeaderShown]);

  return (
    <div
      className={` ${
        isHeaderShown ? " h-16" : " h-0 overflow-hidden"
      } sticky top-0
      
      transform duration-300`}
    >
      <div className=" z-30 bg-white shadow-md w-full relative flex h-full items-center justify-between px-4">
        <Logo />
        <SearchBar />
        <div
          className={`hover:text-primary md:hidden cursor-pointer transform duration-300 text-gray-700`}
          onClick={toggleShowMenu}
        >
          <IoMdMenu size={22} />
        </div>
        <div
          className={` z-30 absolute flex bg-white bg-blur bg-opacity-60 p-4 top-full left-0 w-full flex-col shadow-md md:shadow-none md:static md:w-auto md:h-auto md:flex-row md:p-0 transform duration-700 md:max-h-full ${
            showMenu ? " max-h-48 " : " overflow-hidden max-h-0 py-0"
          }`}
        >
          <Button
            className={" mb-3 md:mb-0 md:mr-3"}
            onClick={() => history.push("/sign-in")}
            fontSize={"sm"}
            appearance={"primary"}
            intent={"primary"}
          >
            Sign In
          </Button>
          <Button
            onClick={() => history.push("/create-account")}
            fontSize={"sm"}
            appearance={"minimal"}
            intent={"primary"}
          >
            Create Account
          </Button>
        </div>
      </div>
      <div
        className={` z-20 fixed top-0 left-0 w-screen h-screen md:hidden ${
          showMenu ? " " : "pointer-events-none"
        }`}
        onClick={setShowMenu.bind(this, false)}
      />
    </div>
  );
};

export default Header;
