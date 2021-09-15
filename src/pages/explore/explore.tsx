import React from "react";
import useHeader from "../../hooks/useHeader";

const Explore = () => {
  const { debouncedSearchQuery } = useHeader();
  return <div>Explore {debouncedSearchQuery}</div>;
};

export default Explore;
