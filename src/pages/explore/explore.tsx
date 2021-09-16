import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useState } from "react";
import Loader from "../../components/loader/loader";
import PageContainer from "../../components/page-container/page-container";
import useMe from "../../hooks/queries/useMe";
import useHeader from "../../hooks/useHeader";
import {
  browseRestaurants,
  browseRestaurantsVariables,
} from "../../__generated__/browseRestaurants";
import Cart from "./cart/cart";
import RestaurantCard from "./restaurant-card/restaurant-card";

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
  const { data: meData } = useMe();
  const { debouncedSearchQuery } = useHeader();
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery<
    browseRestaurants,
    browseRestaurantsVariables
  >(BROWSE_RESTAURANTS_QUERY, {
    variables: {
      input: {
        query: debouncedSearchQuery,
        offset: page - 1,
        limit: 10,
      },
    },
  });

  console.log(meData?.me);
  return (
    <PageContainer>
      <p className=" page-title">Discover Delicious Meals</p>
      {loading && <Loader />}
      {!loading && data?.browseRestaurants.restaurants && (
        <div className=" flex items-start">
          <div className=" flex flex-col w-full h-full overflow-y-auto ">
            {data?.browseRestaurants.restaurants.length > 0 ? (
              data?.browseRestaurants.restaurants?.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} />
              ))
            ) : (
              <p>Sorry, we couldn't find anything. Try a different keyword?</p>
            )}
            {data?.browseRestaurants.restaurants.length > 0 ? (
              data?.browseRestaurants.restaurants?.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} />
              ))
            ) : (
              <p>Sorry, we couldn't find anything. Try a different keyword?</p>
            )}
            {data?.browseRestaurants.restaurants.length > 0 ? (
              data?.browseRestaurants.restaurants?.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} />
              ))
            ) : (
              <p>Sorry, we couldn't find anything. Try a different keyword?</p>
            )}
            {data?.browseRestaurants.restaurants.length > 0 ? (
              data?.browseRestaurants.restaurants?.map((restaurant) => (
                <RestaurantCard restaurant={restaurant} />
              ))
            ) : (
              <p>Sorry, we couldn't find anything. Try a different keyword?</p>
            )}
          </div>
          {meData?.me && <Cart />}
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
