import React from "react";

const InputSkeleton = () => (
  <div className=" w-full animate-pulse">
    <div className=" h-4 w-1/3 mt-8 bg-gray-300" />
    <div className=" h-8 w-full mt-2 bg-gray-300" />
  </div>
);

export default InputSkeleton;
