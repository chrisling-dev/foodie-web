import React from "react";
import coverPhoto from "../../../assets/cover-photo.png";
import { browseRestaurants_browseRestaurants_restaurants } from "../../../__generated__/browseRestaurants";
interface IProps {
  restaurant: browseRestaurants_browseRestaurants_restaurants;
}
const RestaurantCard: React.FC<IProps> = ({ restaurant }) => {
  return (
    <div className=" w-full shadow-md border border-solid border-gray-100 rounded-lg mb-3 p-3 cursor-pointer hover:shadow-lg transform-300">
      <div className=" flex items-center w-full">
        <img
          alt={restaurant.name}
          className=" w-20 h-20 object-cover rounded-lg mr-3"
          src={restaurant.backgroundImage || coverPhoto}
        />
        <div>
          <p className=" font-semibold text-gray-700 text-sm">
            {restaurant.name}
          </p>
          <p className=" text-gray-500 line-clamp-2 text-sm">
            {restaurant.description}
          </p>
        </div>
      </div>
      <div className=" w-full pt-2 grid grid-cols-1 gap-2">
        {restaurant.dishes.slice(0, 3).map((dish) => (
          <div className=" w-full px-3 border-solid border-t border-gray-100 pt-2">
            <p className=" text-xs line-clamp-1 text-gray-500 ">{dish.name}</p>
            <p className=" text-xs mt-1 font-semibold">${dish.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantCard;
