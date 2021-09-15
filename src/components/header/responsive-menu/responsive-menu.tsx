import React from "react";
import { useHistory } from "react-router-dom";
import Button from "../../button/button";

interface IRouteProps {
  name: string;
  path: string;
  focus?: boolean;
}

interface IProps {
  routes: IRouteProps[];
  showMenu: boolean;
  onNavigate: () => any;
}
const ResponsiveMenu: React.FC<IProps> = ({
  children,
  routes,
  showMenu,
  onNavigate,
}) => {
  const history = useHistory();

  const onClick = (path: string) => {
    history.push(path);
    onNavigate();
  };
  const responsiveMenuClassname = ` overflow-hidden z-20 absolute flex bg-white bg-blur bg-opacity-60 p-4 top-full left-0 w-full flex-col shadow-md lg:shadow-none lg:static lg:w-auto lg:h-auto lg:flex-row lg:p-0 transform duration-700 lg:max-h-full ${
    showMenu ? " max-h-48 " : "  max-h-0 py-0"
  }`;
  return (
    <div className={responsiveMenuClassname}>
      {routes.map(({ name, path, focus }) => (
        <Button
          key={name}
          appearance={focus ? "primary" : "minimal"}
          className={" mt-3 lg:mt-0 lg:ml-3"}
          onClick={onClick.bind(this, path)}
          intent={"primary"}
        >
          {name}
        </Button>
      ))}
      {children}
    </div>
  );
};

export default ResponsiveMenu;
