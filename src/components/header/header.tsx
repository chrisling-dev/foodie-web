import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import Logo from "../../assets/logo";
import headerContext from "../../context/header.context";
import SearchBar from "./search-bar/search-bar";
import { useState } from "react";
import useMe from "../../hooks/queries/useMe";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../../apollo";
import { UserRole } from "../../__generated__/globalTypes";
import ResponsiveMenu from "./responsive-menu/responsive-menu";

const regularUsersMenu = [
  {
    name: "Explore Food",
    path: "/",
  },
  {
    name: "My Orders",
    path: "/my-orders",
  },
  {
    name: "My Profile",
    path: "/my-profile",
  },
];
const restaurantOwnersMenu = [
  {
    name: "Dashboard",
    path: "/dashboard",
  },
  {
    name: "All Orders",
    path: "/restaurant-orders",
  },
  {
    name: "My Profile",
    path: "/my-profile",
  },
];

const signedOutMenu = [
  {
    name: "Sign In",
    path: "/sign-in",
    focus: true,
  },
  {
    name: "Create Account",
    path: "/create-account",
  },
];
const Header = () => {
  const history = useHistory();
  const { isHeaderShown } = useContext(headerContext);
  const { data } = useMe();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!isHeaderShown) setShowMenu(false);
  }, [isHeaderShown]);

  const onNavigate = (path?: string) => {
    if (path) history.push(path);
    setShowMenu(false);
  };

  const toggleShowMenu = () => setShowMenu(!showMenu);

  return (
    <div
      className={` ${
        isHeaderShown ? " h-16" : " h-0 overflow-hidden"
      } sticky top-0 z-30 transform duration-300`}
    >
      <div className="z-30 bg-white shadow-md w-full relative flex h-full items-center justify-between px-4">
        <div className=" flex h-full items-center w-full max-w-lg">
          <Logo onClick={onNavigate.bind(this, "/")} />
          {data?.me?.role !== UserRole.RestaurantOwner && (
            <SearchBar hideMenu={setShowMenu.bind(this, false)} />
          )}
        </div>
        <div
          className={`hover:text-primary lg:hidden cursor-pointer transform duration-300 text-gray-700`}
          onClick={toggleShowMenu}
        >
          <IoMdMenu size={22} />
        </div>
        {isLoggedIn ? (
          <React.Fragment>
            {data?.me?.role === UserRole.RegularUser ? (
              <ResponsiveMenu
                onNavigate={onNavigate}
                showMenu={showMenu}
                routes={regularUsersMenu}
              />
            ) : (
              ""
            )}
            {data?.me?.role === UserRole.RestaurantOwner ? (
              <ResponsiveMenu
                onNavigate={onNavigate}
                showMenu={showMenu}
                routes={restaurantOwnersMenu}
              />
            ) : (
              ""
            )}
          </React.Fragment>
        ) : (
          <ResponsiveMenu
            onNavigate={onNavigate}
            showMenu={showMenu}
            routes={signedOutMenu}
          />
        )}
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
