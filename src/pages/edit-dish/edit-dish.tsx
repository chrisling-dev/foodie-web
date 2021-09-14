import { gql, useQuery } from "@apollo/client";
import React from "react";
import { useParams } from "react-router";
import Back from "../../components/back/back";
import InputSkeleton from "../../components/input/input-skeleton";
import PageContainer from "../../components/page-container/page-container";

const GET_DISH_QUERY = gql`
  query getDish($input: GetDishByIdInput!) {
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

  const { data, loading } = useQuery(GET_DISH_QUERY);

  return (
    <PageContainer>
      <div className=" w-full max-w-md mx-auto">
        <Back />
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
      </div>
    </PageContainer>
  );
};

export default EditDish;
