import { useContext } from "react";
import headerContext from "../context/header.context";

const useHeader = () => {
  return useContext(headerContext);
};

export default useHeader;
