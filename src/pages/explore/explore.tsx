import React from "react";
import useHeader from "../../hooks/useHeader";

const Explore = () => {
  const { searchQuery } = useHeader();
  return <div>Explore {searchQuery}</div>;
};

export default Explore;
