import AddMeal from "../pages/add-meal/add-meal";
import Cart from "../pages/cart/cart";
import CreateAccount from "../pages/create-account/create-account";
import CreateRestaurant from "../pages/create-restaurant/create-restaurant";
import Dashboard from "../pages/dashboard/dashboard";
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
    component: Restaurant,
    path: "/restaurant/:restaurantId",
  },
  {
    component: NotFound,
  },
];

export const restaurantOwnersRoutes = [
  {
    component: AddMeal,
    path: "/add-meal",
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
