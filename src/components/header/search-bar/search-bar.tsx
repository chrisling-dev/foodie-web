import React from "react";
import { IoMdSearch } from "react-icons/io";
const SearchBar = () => {
  return (
    <div className=" px-4 max-w-xs w-full md:max-w-sm">
      <div className=" bg-gray-200 rounded-lg px-9 py-2 relative">
        <div className=" absolute top-1/2 left-0 transform -translate-y-1/2 ml-3 text-gray-400">
          <IoMdSearch />
        </div>
        <input
          className="focus:outline-none bg-gray-200 w-full text-sm caret-gray-400 placeholder-gray-400 overflow-ellipsis"
          placeholder="Search a meal, restaurant..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
