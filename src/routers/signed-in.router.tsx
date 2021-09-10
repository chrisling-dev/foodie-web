import { Route, Switch } from "react-router-dom";
import Loader from "../components/loader/loader";
import useMe from "../hooks/queries/useMe";
import { UserRole } from "../__generated__/globalTypes";
import {
  publicRoutes,
  regularUsersRoutes,
  restaurantOwnersRoutes,
} from "./paths";

const SignedInRouter = () => {
  const { data, loading } = useMe();
  return loading ? (
    <div className={"w-full flex items-center justify-center"}>
      <Loader />
    </div>
  ) : (
    <Switch>
      {data?.me.role === UserRole.RegularUser &&
        regularUsersRoutes.map((path) => (
          <Route key={`${path.path}_key`} {...path} exact={true} />
        ))}
      {data?.me.role === UserRole.RestaurantOwner &&
        restaurantOwnersRoutes.map((path) => (
          <Route key={`${path.path}_key`} {...path} exact={true} />
        ))}
      {publicRoutes.map((path) => (
        <Route key={`${path.path}_key`} {...path} exact={true} />
      ))}
    </Switch>
  );
};

export default SignedInRouter;
