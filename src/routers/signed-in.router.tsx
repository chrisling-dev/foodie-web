import { Route, Switch } from "react-router-dom";
import { publicRoutes } from "./paths";

const SignedInRouter = () => {
  return (
    <Switch>
      {publicRoutes.map((path) => (
        <Route key={`${path.path}_key`} {...path} exact={true} />
      ))}
    </Switch>
  );
};

export default SignedInRouter;
