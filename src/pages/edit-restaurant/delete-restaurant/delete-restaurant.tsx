import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/button/button";
import ErrorMessage from "../../../components/error-message/error-message";
import Input from "../../../components/input/input";
import Modal from "../../../components/modal/modal";
import useInput from "../../../hooks/useInput";
import {
  deleteRestaurant,
  deleteRestaurantVariables,
} from "../../../__generated__/deleteRestaurant";
import { myRestaurant_myRestaurant_restaurant } from "../../../__generated__/myRestaurant";
import { myRestaurants } from "../../../__generated__/myRestaurants";
import { MY_RESTAURANTS } from "../../dashboard/dashboard";

const DELETE_RESTAURANT_MUTATION = gql`
  mutation deleteRestaurant($input: DeleteRestaurantInput!) {
    deleteRestaurant(input: $input) {
      ok
      error {
        code
        message
      }
      restaurant {
        id
        name
      }
    }
  }
`;
interface IProps {
  restaurant: myRestaurant_myRestaurant_restaurant;
}
const DeleteRestaurant: React.FC<IProps> = ({ restaurant }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);
  const name = useInput("");

  const apolloClient = useApolloClient();
  const [deleteRestaurantMutation, { data, loading }] = useMutation<
    deleteRestaurant,
    deleteRestaurantVariables
  >(DELETE_RESTAURANT_MUTATION, {
    onCompleted({ deleteRestaurant: { restaurant } }) {
      if (restaurant) {
        const currentData = apolloClient.readQuery<myRestaurants>({
          query: MY_RESTAURANTS,
        });
        if (currentData) {
          let restaurants = [...currentData.myRestaurants.restaurants];
          if (restaurants && restaurants.length > 0) {
            for (let i = 0; i < restaurants.length; i++) {
              const curRes = restaurants[i];
              if (curRes.id === restaurant.id) {
                if (i === 0) {
                  restaurants = [];
                  break;
                }
                restaurants.splice(i, 1);
                break;
              }
            }
            apolloClient.writeQuery({
              query: MY_RESTAURANTS,
              data: {
                ...currentData,
                myRestaurants: {
                  ...currentData.myRestaurants,
                  restaurants,
                },
              },
            });
          }
        }
        toast.success(`${restaurant.name} has been removed!`);
        history.replace("/");
      }
    },
  });

  const onDelete = () => {
    deleteRestaurantMutation({
      variables: {
        input: {
          id: restaurant.id,
        },
      },
    });
  };
  return (
    <div>
      <div
        className=" text-red-400 flex p-2 rounded-md items-center group cursor-pointer hover:bg-red-400 hover:text-white transform-300"
        onClick={setShowModal.bind(this, true)}
      >
        <p className=" mr-2 w-0 text-right overflow-hidden truncate group-hover:w-14 transform-300">
          Delete
        </p>
        <FaRegTrashAlt />
      </div>
      <Modal title={`Delete ${restaurant.name}?`} showModal={showModal}>
        <p className=" text-gray-500 text-sm mt-2">
          This action is not reversible! Are you sure you want to delete{" "}
          <span className=" italic font-semibold">{restaurant.name}</span>?
        </p>
        <p className=" text-xs text-gray-400 mt-4 mb-2">
          To confirm, please repeat{" "}
          <span className=" italic font-semibold">{restaurant.name}</span>{" "}
          below.
        </p>
        <Input {...name.inputProps} placeholder={restaurant.name} />
        {data?.deleteRestaurant.error && (
          <ErrorMessage className=" mt-3">
            {data.deleteRestaurant.error.message}
          </ErrorMessage>
        )}
        <div className=" flex flex-col w-full mt-4 pt-4 border-solid border-t border-gray-200">
          <Button
            className=" mb-3"
            appearance={"primary"}
            intent={"danger"}
            disabled={loading || name.value !== restaurant.name}
            loading={loading}
            loadingLabel="Deleting"
            onClick={onDelete}
          >
            Confirm Delete
          </Button>
          <Button onClick={setShowModal.bind(this, false)}>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteRestaurant;
