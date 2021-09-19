import React from "react";
import { gql, useQuery } from "@apollo/client";
import { useHistory, useParams } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import Back from "../../components/back/back";
import PageContainer from "../../components/page-container/page-container";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";
import coverPhoto from "../../assets/cover-photo.png";
import DishCard from "./dish-card/dish-card";
import Button from "../../components/button/button";
import ErrorMessage from "../../components/error-message/error-message";

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error {
        code
        message
      }
      restaurant {
        id
        name
        description
        backgroundImage
        dishes {
          id
          name
          price
          description
          photo
        }
      }
    }
  }
`;

const MyRestaurant = () => {
  const params = useParams<{ restaurantId?: string }>();
  const history = useHistory();
  const id = +(params.restaurantId || 0);
  const { data, loading } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id,
        },
      },
      skip: !params.restaurantId || isNaN(+params.restaurantId),
    }
  );

  return (
    <div>
      {loading && <div className=" w-full h-40 md:h-60 lg:h-80 skeleton" />}
      {!loading && data?.myRestaurant.restaurant && (
        <img
          className="w-full h-40 md:h-60 lg:h-80 object-cover"
          alt={data?.myRestaurant.restaurant?.name}
          src={data.myRestaurant.restaurant.backgroundImage || coverPhoto}
        />
      )}
      <PageContainer>
        <div className=" flex items-center justify-between">
          <Back path="/" />
          {!loading && data?.myRestaurant.restaurant && (
            <div>
              <div
                className=" cursor-pointer text-gray-500 hover:text-gray-700 transform-300"
                onClick={() => history.push(`/edit-restaurant/${id}`)}
              >
                <FiEdit />
              </div>
            </div>
          )}
        </div>
        {loading && (
          <div className=" w-full">
            <div className=" w-1/4 h-5 skeleton rounded-md" />
            <div className=" w-full h-5 skeleton rounded-md mt-4" />
            <div className=" w-3/5 h-5 skeleton rounded-md mt-2" />
          </div>
        )}
        {!loading && data?.myRestaurant.restaurant && (
          <div>
            <h1 className=" page-title mb-0">
              {data.myRestaurant.restaurant.name}
            </h1>
            <p className=" text-gray-500">
              {data.myRestaurant.restaurant.description}
            </p>
            <div className=" grid grid-cols-2 w-max gap-3 mt-3 mb-8">
              <Button
                appearance="primary"
                intent="primary"
                onClick={() =>
                  history.push(`/add-dish/${data.myRestaurant.restaurant?.id}`)
                }
              >
                Add Dish &rarr;
              </Button>
              <Button
                onClick={() =>
                  history.push(
                    `/restaurant-orders/${data.myRestaurant.restaurant?.id}`
                  )
                }
              >
                View Orders &rarr;
              </Button>
            </div>
            <h1 className=" mt-4 page-title">
              My dishes ({data.myRestaurant.restaurant.dishes.length})
            </h1>
            {data.myRestaurant.restaurant.dishes.length > 0 ? (
              <div className=" w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-3 ">
                {data.myRestaurant.restaurant.dishes.map((dish) => (
                  <DishCard key={`${dish.id}_${dish.name}`} dish={dish} />
                ))}
              </div>
            ) : (
              <p
                className=" underline cursor-pointer text-gray-500 hover:text-primary transform-300"
                onClick={() =>
                  history.push(`/add-dish/${data.myRestaurant.restaurant?.id}`)
                }
              >
                Create your firsh dish &rarr;
              </p>
            )}
          </div>
        )}
        {!loading && data?.myRestaurant.error && (
          <ErrorMessage>{data.myRestaurant.error.message}</ErrorMessage>
        )}
      </PageContainer>
    </div>
  );
};

export default MyRestaurant;
