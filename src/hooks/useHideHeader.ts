import { useEffect } from "react";
import useHeader from "./useHeader";

const useHideHeader = () => {
  const { showHeader, hideHeader } = useHeader();

  useEffect(() => {
    hideHeader();
    return () => {
      showHeader();
    };
  });
};

export default useHideHeader;
