import { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import Loader from "../components/loader/loader";
import useMe from "../hooks/queries/useMe";
import useNavigate from "../hooks/useNavigate";
import { AUTH_TOKEN } from "../utils/constants";
import { UserRole } from "../__generated__/globalTypes";
import {
  publicRoutes,
  regularUsersRoutes,
  restaurantOwnersRoutes,
} from "./paths";

const SignedInRouter = () => {
  const { toSignIn } = useNavigate();
  const { data, loading, error } = useMe({ fetchPolicy: "network-only" });

  useEffect(() => {
    if (!loading && error && error.message === "Forbidden resource") {
      localStorage.removeItem(AUTH_TOKEN);
      authTokenVar(null);
      toSignIn();
      isLoggedInVar(false);
    }
  }, [loading, error, toSignIn]);

  return loading ? (
    <div className={"w-full flex items-center justify-center mt-20"}>
      <Loader />
    </div>
  ) : (
    <Switch>
      {data?.me?.role === UserRole.RegularUser &&
        regularUsersRoutes.map((path) => (
          <Route key={`${path.path}_key`} {...path} exact={true} />
        ))}
      {data?.me?.role === UserRole.RestaurantOwner &&
        restaurantOwnersRoutes.map((path) => (
          <Route key={`${path.path}_key`} {...path} exact={true} />
        ))}
      {publicRoutes(data?.me?.role).map((path) => (
        <Route key={`${path.path}_key`} {...path} exact={true} />
      ))}
    </Switch>
  );
};

export default SignedInRouter;
