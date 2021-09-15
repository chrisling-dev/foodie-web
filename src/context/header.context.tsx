import { useState } from "react";
import { createContext } from "react";
import Header from "../components/header/header";
import useDebounce from "../hooks/useDebounce";

interface HeaderContextProps {
  debouncedSearchQuery?: string;
  isHeaderShown: boolean;
  searchQuery?: string;
  hideHeader: () => void;
  search?: (query: string) => any;
  showHeader: () => void;
}
const headerContext = createContext<HeaderContextProps>({
  isHeaderShown: true,
  hideHeader: () => {},
  showHeader: () => {},
});

export const HeaderProvider: React.FC = ({ children }) => {
  const [isHeaderShown, setIsHeaderShown] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 800);

  const hideHeader = () => {
    setIsHeaderShown(false);
  };

  const showHeader = () => {
    setIsHeaderShown(true);
  };

  const search = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <headerContext.Provider
      value={{
        debouncedSearchQuery,
        isHeaderShown,
        searchQuery,
        hideHeader,
        search,
        showHeader,
      }}
    >
      <Header />
      {children}
    </headerContext.Provider>
  );
};

export default headerContext;
