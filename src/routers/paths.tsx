import AddDish from "../pages/add-dish/add-dish";
import Cart from "../pages/cart/cart";
import CreateAccount from "../pages/create-account/create-account";
import CreateRestaurant from "../pages/create-restaurant/create-restaurant";
import Dashboard from "../pages/dashboard/dashboard";
import EditDish from "../pages/edit-dish/edit-dish";
import EditRestaurant from "../pages/edit-restaurant/edit-restaurant";
import Explore from "../pages/explore/explore";
import MyOrders from "../pages/my-orders/my-orders";
import MyProfile from "../pages/my-profile/my-profile";
import MyRestaurant from "../pages/my-restaurant/my-restaurant";
import NotFound from "../pages/not-found/not-found";
import Restaurant from "../pages/restaurant/restaurant";
import SignIn from "../pages/sign-in/sign-in";
import { UserRole } from "../__generated__/globalTypes";

export const publicRoutes = (role?: UserRole) => [
  {
    component: role === UserRole.RestaurantOwner ? Dashboard : Explore,
    path: "/",
  },
  {
    component: role === UserRole.RestaurantOwner ? MyRestaurant : Restaurant,
    path: "/restaurant/:restaurantId",
  },
  {
    component: NotFound,
  },
];

export const restaurantOwnersRoutes = [
  {
    component: AddDish,
    path: "/add-dish/:restaurantId",
  },
  {
    component: CreateRestaurant,
    path: "/create-restaurant",
  },
  {
    component: Dashboard,
    path: "/dashboard",
  },
  {
    component: EditDish,
    path: "/edit-dish/:id",
  },
  {
    component: EditRestaurant,
    path: "/edit-restaurant/:id",
  },
  {
    component: MyProfile,
    path: "/my-profile",
  },
  {
    component: MyRestaurant,
    path: "/my-restaurant/:restaurantId",
  },
];

export const regularUsersRoutes = [
  {
    component: Cart,
    path: "/cart",
  },
  {
    component: MyOrders,
    path: "/my-orders",
  },
  {
    component: MyProfile,
    path: "/my-profile",
  },
];

export const signedOutRoutes = [
  {
    component: CreateAccount,
    path: "/create-account",
  },
  {
    component: SignIn,
    path: "/sign-in",
  },
];
