import { useState } from "react";
import { createContext } from "react";
import Header from "../components/header/header";

interface HeaderContextProps {
  isHeaderShown: boolean;
  hideHeader: () => void;
  showHeader: () => void;
}
const headerContext = createContext<HeaderContextProps>({
  isHeaderShown: true,
  hideHeader: () => {},
  showHeader: () => {},
});

export const HeaderProvider: React.FC = ({ children }) => {
  const [isHeaderShown, setIsHeaderShown] = useState(true);

  const hideHeader = () => {
    setIsHeaderShown(false);
  };

  const showHeader = () => {
    setIsHeaderShown(true);
  };

  return (
    <headerContext.Provider
      value={{
        isHeaderShown,
        hideHeader,
        showHeader,
      }}
    >
      <Header />
      {children}
    </headerContext.Provider>
  );
};

export default headerContext;
