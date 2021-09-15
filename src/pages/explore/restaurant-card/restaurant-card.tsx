import React from "react";
import { browseRestaurants_browseRestaurants_restaurants } from "../../../__generated__/browseRestaurants";

interface IProps {
  restaurant: browseRestaurants_browseRestaurants_restaurants;
}
const RestaurantCard: React.FC<IProps> = ({ restaurant }) => {
  return <div>{restaurant.name}</div>;
};

export default RestaurantCard;
