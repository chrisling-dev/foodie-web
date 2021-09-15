import { useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import Back from "../../components/back/back";
import ErrorMessage from "../../components/error-message/error-message";
import InputSkeleton from "../../components/input/input-skeleton";
import PageContainer from "../../components/page-container/page-container";
import {
  myRestaurant,
  myRestaurantVariables,
} from "../../__generated__/myRestaurant";
import { MY_RESTAURANT_QUERY } from "../my-restaurant/my-restaurant";
import DeleteRestaurant from "./delete-restaurant/delete-restaurant";
import EditRestaurantForm from "./edit-restaurant-form/edit-restaurant-form";

const EditRestaurant = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<myRestaurant, myRestaurantVariables>(
    MY_RESTAURANT_QUERY,
    {
      variables: {
        input: {
          id: +id,
        },
      },
      skip: !id || isNaN(+id),
    }
  );

  return (
    <PageContainer>
      <div className=" w-full max-w-md mx-auto">
        <div className=" w-full flex justify-between items-center">
          <Back />
          {!loading && data?.myRestaurant.restaurant && (
            <DeleteRestaurant restaurant={data.myRestaurant.restaurant} />
          )}
        </div>
        {loading && (
          <div>
            <div className=" h-5 w-2/5 skeleton" />
            <div className=" h-4 w-full mt-4 skeleton" />
            <div className=" h-4 w-1/5 mt-2 skeleton" />
            <div className=" mt-12">
              <InputSkeleton />
              <InputSkeleton />
              <InputSkeleton />
            </div>
            <div className=" h-8 w-full mt-12 skeleton" />
          </div>
        )}
        {!loading && data?.myRestaurant.error && (
          <ErrorMessage>{data.myRestaurant.error.message}</ErrorMessage>
        )}
        {!loading && data?.myRestaurant.restaurant && (
          <EditRestaurantForm restaurant={data.myRestaurant.restaurant} />
        )}
      </div>
    </PageContainer>
  );
};

export default EditRestaurant;
