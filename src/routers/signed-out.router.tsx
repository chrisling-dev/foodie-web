import { Route, Switch } from "react-router-dom";
import useMe from "../hooks/queries/useMe";
import { publicRoutes, signedOutRoutes } from "./paths";

const SignedOutRouter = () => {
  const { data } = useMe();
  return (
    <Switch>
      {signedOutRoutes.map((path) => (
        <Route key={`${path.path}_key`} {...path} exact={true} />
      ))}
      {publicRoutes(data?.me?.role).map((path) => (
        <Route key={`${path.path}_key`} {...path} exact={true} />
      ))}
    </Switch>
  );
};

export default SignedOutRouter;
