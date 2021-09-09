import { Route, Switch } from "react-router-dom";
import { publicRoutes } from "./paths";

const SignedInRouter = () => {
  return (
    <Switch>
      {publicRoutes.map((path) => (
        <Route {...path} exact={true} />
      ))}
    </Switch>
  );
};

export default SignedInRouter;
