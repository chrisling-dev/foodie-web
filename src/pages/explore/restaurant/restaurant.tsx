import React from "react";
import coverPhoto from "../../../assets/cover-photo.png";
import Back from "../../../components/back/back";
import PageContainer from "../../../components/page-container/page-container";
import { browseRestaurants_browseRestaurants_restaurants } from "../../../__generated__/browseRestaurants";
import Cart from "../cart/cart";
import DishCard from "./dish-card/dish-card";

interface IProps {
  restaurant: browseRestaurants_browseRestaurants_restaurants;
  onBack: () => void;
}

const Restaurant: React.FC<IProps> = ({ restaurant, onBack }) => {
  return (
    <PageContainer
      className=" p-0 px-0 pt-0 lg:px-10pc lg:pt-8 w-full"
      override={true}
    >
      <div className=" flex items-start lg:pt-11">
        <div
          className=" 
        w-full 
        lg:border lg:border-solid lg:border-gray-200 lg:rounded-xl lg:overflow-hidden
        "
        >
          <img
            alt={restaurant.name}
            className=" w-full h-64 md:h-72 object-cover"
            src={restaurant.backgroundImage || coverPhoto}
          />
          <PageContainer className=" lg:px-4 lg:pb-4">
            <Back onClick={onBack} />
            <p className=" page-title mb-0">{restaurant.name}</p>
            <p className=" text-gray-500">{restaurant.description}</p>
            <div className=" mt-4 grid grid-cols-1 lg:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-3">
              {restaurant.dishes.map((dish) => (
                <DishCard
                  key={`${dish.id}`}
                  dish={dish}
                  restaurant={restaurant}
                />
              ))}
            </div>
          </PageContainer>
        </div>
        <Cart />
      </div>
    </PageContainer>
  );
};

export default Restaurant;
