import React from "react";
import { myRestaurant_myRestaurant_restaurant_dishes } from "../../../__generated__/myRestaurant";

interface IProps {
  dish: myRestaurant_myRestaurant_restaurant_dishes;
}
const DishCard: React.FC<IProps> = ({ dish }) => {
  return (
    <div className=" w-full rounded-lg shadow-md overflow-hidden border border-solid border-gray-100 flex items-center hover:shadow-lg transform-300 cursor-pointer">
      {dish.photo ? (
        <img
          className=" w-32 h-32 object-cover"
          alt={dish.name}
          src={dish.photo}
        />
      ) : (
        <div className=" w-32 h-32 flex items-center justify-center bg-yellow-100 ">
          🍔
        </div>
      )}
      <div className=" h-full flex flex-1 flex-col justify-between max-h-28 p-3">
        <div>
          <p className=" font-semibold text-gray-700">{dish.name}</p>
          <p className=" overflow-ellipsis overflow-hidden text-sm line-clamp-1 text-gray-500">
            {dish.description}
          </p>
        </div>
        <p className=" font-semibold text-gray-500">${dish.price}</p>
      </div>
    </div>
  );
};

export default DishCard;
