import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import Loader from "../../components/loader/loader";
import PageContainer from "../../components/page-container/page-container";
import useHeader from "../../hooks/useHeader";
import {
  browseRestaurants,
  browseRestaurantsVariables,
  browseRestaurants_browseRestaurants_restaurants,
} from "../../__generated__/browseRestaurants";
import Cart from "./cart/cart";
import RestaurantCard from "./restaurant-card/restaurant-card";
import Restaurant from "./restaurant/restaurant";

const BROWSE_RESTAURANTS_QUERY = gql`
  query browseRestaurants($input: BrowseRestaurantsInput!) {
    browseRestaurants(input: $input) {
      ok
      error {
        code
        message
      }
      restaurants {
        backgroundImage
        description
        id
        name
        dishes {
          description
          id
          photo
          price
          name
        }
      }
    }
  }
`;
const Explore = () => {
  const { debouncedSearchQuery } = useHeader();
  const [browsingRestaurant, setBrowsingRestaurant] = useState<
    browseRestaurants_browseRestaurants_restaurants | undefined
  >();
  const { data, loading, error } = useQuery<
    browseRestaurants,
    browseRestaurantsVariables
  >(BROWSE_RESTAURANTS_QUERY, {
    variables: {
      input: {
        query: debouncedSearchQuery,
        offset: 0,
        limit: 10,
      },
    },
    fetchPolicy: "network-only",
  });

  const onBrowseRestaurant = (
    restaurant: browseRestaurants_browseRestaurants_restaurants
  ) => {
    setBrowsingRestaurant(restaurant);
  };

  return browsingRestaurant ? (
    <Restaurant
      restaurant={browsingRestaurant}
      onBack={setBrowsingRestaurant.bind(this, undefined)}
    />
  ) : (
    <PageContainer>
      <p className=" page-title">Discover Delicious Meals</p>
      {loading && <Loader />}
      {!loading && data?.browseRestaurants.restaurants && (
        <div className=" flex items-start">
          <div className=" flex flex-col w-full h-full overflow-y-auto ">
            {data?.browseRestaurants.restaurants.length > 0 ? (
              data?.browseRestaurants.restaurants?.map((restaurant) => (
                <RestaurantCard
                  key={`${restaurant.id}`}
                  onClick={onBrowseRestaurant}
                  restaurant={restaurant}
                />
              ))
            ) : (
              <p>Sorry, we couldn't find anything. Try a different keyword?</p>
            )}
          </div>
          <Cart />
        </div>
      )}
      {!loading && error && (
        <p>
          Could not reach server! Please check your connection and try again!{" "}
        </p>
      )}
    </PageContainer>
  );
};

export default Explore;
