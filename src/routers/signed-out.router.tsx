import { Route, Switch } from "react-router-dom";
import { publicRoutes, signedOutRoutes } from "./paths";

const SignedOutRouter = () => {
  return (
    <Switch>
      {signedOutRoutes.map((path) => (
        <Route key={`${path.path}_key`} {...path} exact={true} />
      ))}
      {publicRoutes.map((path) => (
        <Route key={`${path.path}_key`} {...path} exact={true} />
      ))}
    </Switch>
  );
};

export default SignedOutRouter;
