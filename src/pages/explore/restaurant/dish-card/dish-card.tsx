import React from "react";
import { useState } from "react";
import Back from "../../../../components/back/back";
import Button from "../../../../components/button/button";
import Modal from "../../../../components/modal/modal";
import useCart from "../../../../hooks/useCart";
import {
  browseRestaurants_browseRestaurants_restaurants,
  browseRestaurants_browseRestaurants_restaurants_dishes,
} from "../../../../__generated__/browseRestaurants";

interface IProps {
  dish: browseRestaurants_browseRestaurants_restaurants_dishes;
  restaurant: browseRestaurants_browseRestaurants_restaurants;
}
const DishCard: React.FC<IProps> = ({ dish, restaurant }) => {
  const { cart } = useCart();
  const [showDish, setShowDish] = useState(false);

  const restaurantConflict =
    cart?.restaurant && cart.restaurant.id !== restaurant.id;
  return (
    <React.Fragment>
      <div
        className=" w-full py-3 rounded-md p-3 hover:bg-blue-50 transform-300 cursor-pointer"
        onClick={setShowDish.bind(this, true)}
      >
        <div className=" flex items-center">
          {dish.photo ? (
            <img
              alt={dish.name}
              className=" h-24 w-24 object-cover rounded-lg mr-3"
              src={dish.photo}
            />
          ) : (
            <div className=" h-28 w-28"></div>
          )}
          <div>
            <p className=" text-sm text-gray-700">{dish.name}</p>
            <p className=" text-sm text-gray-400 line-clamp-2">
              {dish.description}
            </p>
            <p className=" text-sm font-semibold text-gray-700 mt-2">
              ${dish.price}
            </p>
          </div>
        </div>
      </div>
      <Modal showModal={showDish} onClose={setShowDish.bind(this, false)}>
        <Back onClick={setShowDish.bind(this, false)} />
        <div className=" h-96 overflow-y-auto py-2">
          {dish.photo ? (
            <img
              alt={dish.name}
              className=" rounded-lg w-full h-auto max-h-48 object-cover"
              src={dish.photo}
            />
          ) : (
            ""
          )}
          <p className=" mt-3 page-title">{dish.name}</p>
          <p className=" text-gray-500">{dish.description}</p>
        </div>
        <div className=" pt-3">
          <div className=" px-2 mb-2 w-full flex items-center justify-between">
            <p>Price</p>
            <p>${dish.price}</p>
          </div>
          <Button className=" w-full" appearance={"primary"} intent={"primary"}>
            Add to Cart
          </Button>
          {restaurantConflict && (
            <div>
              <p>You cannot add to cart</p>
            </div>
          )}
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default DishCard;
