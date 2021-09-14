import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import Back from "../../components/back/back";
import ErrorMessage from "../../components/error-message/error-message";
import InputSkeleton from "../../components/input/input-skeleton";
import PageContainer from "../../components/page-container/page-container";
import {
  getDishById,
  getDishByIdVariables,
} from "../../__generated__/getDishById";
import DeleteDish from "./delete-dish/delete-dish";
import EditDishForm from "./edit-dish-form/edit-dish-form";

const GET_DISH_QUERY = gql`
  query getDishById($input: GetDishByIdInput!) {
    getDishById(input: $input) {
      ok
      error {
        code
        message
      }
      dish {
        id
        name
        price
        description
        photo
      }
    }
  }
`;
const EditDish = () => {
  const { id } = useParams<{ id: string }>();

  const { data, loading } = useQuery<getDishById, getDishByIdVariables>(
    GET_DISH_QUERY,
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
          {!loading && data?.getDishById.dish && (
            <DeleteDish dish={data.getDishById.dish} />
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
        {!loading && data?.getDishById.error && (
          <ErrorMessage>{data.getDishById.error.message}</ErrorMessage>
        )}
        {!loading && data?.getDishById.dish && (
          <EditDishForm dish={data.getDishById.dish} />
        )}
      </div>
    </PageContainer>
  );
};

export default EditDish;
