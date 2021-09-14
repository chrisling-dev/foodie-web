import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../components/button/button";
import ErrorMessage from "../../../components/error-message/error-message";
import Modal from "../../../components/modal/modal";
import {
  deleteDish,
  deleteDishVariables,
} from "../../../__generated__/deleteDish";
import { getDishById_getDishById_dish } from "../../../__generated__/getDishById";
import { myRestaurant } from "../../../__generated__/myRestaurant";
import { MY_RESTAURANT_QUERY } from "../../my-restaurant/my-restaurant";

const DELETE_DISH_MUTATION = gql`
  mutation deleteDish($input: DeleteDishInput!) {
    deleteDish(input: $input) {
      ok
      error {
        code
        message
      }
      dish {
        id
        name
        restaurant {
          id
        }
      }
    }
  }
`;
interface IProps {
  dish: getDishById_getDishById_dish;
}
const DeleteDish: React.FC<IProps> = ({ dish }) => {
  const history = useHistory();
  const [showModal, setShowModal] = useState(false);

  const apolloClient = useApolloClient();
  const [deleteDishMutation, { data, loading }] = useMutation<
    deleteDish,
    deleteDishVariables
  >(DELETE_DISH_MUTATION, {
    onCompleted({ deleteDish: { dish } }) {
      if (dish) {
        const variables = {
          input: {
            id: dish.restaurant.id,
          },
        };
        const currentData = apolloClient.readQuery<myRestaurant>({
          query: MY_RESTAURANT_QUERY,
          variables,
        });
        if (currentData) {
          let dishes = currentData.myRestaurant.restaurant?.dishes;
          if (dishes && dishes.length > 0) {
            for (let i = 0; i < dishes.length; i++) {
              const curDish = dishes[i];
              if (curDish.id === dish.id) {
                if (i === 0) {
                  dishes = [];
                  break;
                }
                dishes.splice(i, 1);
                break;
              }
            }
            apolloClient.writeQuery({
              query: MY_RESTAURANT_QUERY,
              variables,
              data: {
                ...currentData,
                myRestaurant: {
                  ...currentData.myRestaurant,
                  restaurant: {
                    ...currentData.myRestaurant.restaurant,
                    dishes,
                  },
                },
              },
            });
          }
        }
        toast.success(`${dish.name} has been removed!`);
        history.goBack();
      }
    },
  });

  const onDelete = () => {
    deleteDishMutation({
      variables: {
        input: {
          id: dish.id,
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
      <Modal title={`Delete ${dish.name}?`} showModal={showModal}>
        <p className=" text-gray-500 text-sm mt-2">
          Are you sure you want to delete{" "}
          <span className=" italic font-semibold">{dish.name}</span>?
        </p>
        {data?.deleteDish.error && (
          <ErrorMessage className=" mt-3">
            {data.deleteDish.error.message}
          </ErrorMessage>
        )}
        <div className=" flex flex-col w-full mt-4 pt-4 border-solid border-t border-gray-200">
          <Button
            className=" mb-3"
            appearance={"primary"}
            intent={"danger"}
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

export default DeleteDish;
