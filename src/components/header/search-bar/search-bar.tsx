import React from "react";
import { IoMdSearch } from "react-icons/io";
import { useHistory } from "react-router-dom";
const SearchBar = () => {
  const history = useHistory();
  const onFocus = () => {
    history.push("/");
  };
  return (
    <div className=" px-6 md:px-8 w-full max-w-md">
      <div className=" bg-gray-200 rounded-lg px-9 py-2 relative max-w-xs w-full ">
        <div className=" absolute top-1/2 left-0 transform -translate-y-1/2 ml-3 text-gray-400">
          <IoMdSearch />
        </div>
        <input
          className="focus:outline-none bg-gray-200 w-full text-sm caret-gray-400 placeholder-gray-400 overflow-ellipsis"
          placeholder="Search meal, restaurant..."
          onFocus={onFocus}
        />
      </div>
    </div>
  );
};

export default SearchBar;
