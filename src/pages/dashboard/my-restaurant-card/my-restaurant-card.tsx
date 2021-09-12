import React from "react";
import { useHistory } from 'react-router-dom'
import { myRestaurants_myRestaurants_restaurants } from "../../../__generated__/myRestaurants";
import coverPhoto from "../../../assets/cover-photo.png";
interface IProps {
  restaurant: myRestaurants_myRestaurants_restaurants;
}
const MyRestaurantCard: React.FC<IProps> = ({ restaurant }) => {
    const history = useHistory()
  return (
    <div className=" cursor-pointer hover:shadow-lg group transform-300 w-full h-56 flex flex-col rounded-lg border border-solid border-gray-100 shadow-md overflow-hidden" onClick={() => history.push(`/my-restaurant/${restaurant.id}`)}>
      <img
        className=" w-full h-24 object-cover"
        alt={restaurant.name}
        src={restaurant.backgroundImage || coverPhoto}
      />
      <div className=" flex-1 p-3 flex flex-col justify-between">
        <div className=" w-full">
          <p className=" text-gray-700 font-semibold text-lg group-hover:text-primary">
            {restaurant.name}
          </p>
          <p className=" w-full text-gray-500 text-sm">
            {restaurant.description}
          </p>
        </div>
        <div className=" w-full flex items-center justify-end">
          <p className=" text-xs text-gray-500">
            Total Orders: {restaurant.orderCounts}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyRestaurantCard;
