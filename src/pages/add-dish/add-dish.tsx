import { gql, useApolloClient, useMutation } from "@apollo/client";
import { getApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Back from "../../components/back/back";
import Button from "../../components/button/button";
import ErrorMessage from "../../components/error-message/error-message";
import ImagePicker from "../../components/image-picker/image-picker";
import Input from "../../components/input/input";
import PageContainer from "../../components/page-container/page-container";
import { UPLOAD_FAILED_MESSAGE } from "../../utils/constants";
import { addDish, addDishVariables } from "../../__generated__/addDish";
import { MY_RESTAURANT_QUERY } from "../my-restaurant/my-restaurant";
import { toast } from "react-toastify";

const ADD_DISH_MUTATION = gql`
  mutation addDish($input: AddDishInput!) {
    addDish(input: $input) {
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
interface IFormProps {
  name: string;
  description?: string;
  price: number;
}
const AddDish = () => {
  const params = useParams<{ restaurantId?: string }>();
  const restaurantId = +(params.restaurantId || 0);
  const { register, formState, getValues, reset } = useForm<IFormProps>({
    mode: "onChange",
  });

  const apolloClient = useApolloClient();
  const [addDishMutation] = useMutation<addDish, addDishVariables>(
    ADD_DISH_MUTATION,
    {
      onCompleted: ({ addDish: { ok, error, dish } }) => {
        if (ok && dish) {
          const existingData = apolloClient.readQuery({
            query: MY_RESTAURANT_QUERY,
            variables: {
              input: {
                id: restaurantId,
              },
            },
          });
          if (existingData) {
            apolloClient.writeQuery({
              query: MY_RESTAURANT_QUERY,
              data: {
                ...existingData,
                myRestaurant: {
                  ...existingData.myRestaurant,
                  restaurant: {
                    ...existingData.myRestaurant.restaurant,
                    dishes: [
                      ...existingData.myRestaurant.restaurant.dishes,
                      dish,
                    ],
                  },
                },
              },
            });
          }
          setLoading(false);
          toast.success(`${dish.name} has been added to your menu!`, {
            position: "top-right",
          });
          reset();
        } else if (error) {
          setError(error.message);
        }
      },
    }
  );

  const [error, setError] = useState<string | undefined>();
  const [photo, setPhoto] = useState<File | undefined>();
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Creating dish");

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, price } = getValues();
    if (isNaN(price)) return setError("Price must be number!");
    if (isNaN(restaurantId))
      return setError("Something's wrong! Please go back and try again");
    setLoading(true);
    if (photo) {
      setLoadingLabel("Uploading photo");
      const storage = getStorage(getApp());
      const imageRef = ref(
        storage,
        `/dishes/photo/${Date.now()}_${photo.name}`
      );
      const uploadTask = uploadBytesResumable(imageRef, photo);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          setLoading(false);
          setError(UPLOAD_FAILED_MESSAGE);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLoadingLabel("Creating dish");
            addDishMutation({
              variables: {
                input: {
                  name,
                  description,
                  price,
                  photo: downloadURL,
                  restaurantId,
                },
              },
            });
          });
        }
      );
    } else {
      addDishMutation({
        variables: {
          input: {
            name,
            description,
            price,
            restaurantId,
          },
        },
      });
    }
  };
  return (
    <PageContainer>
      <div className=" w-full max-w-md mx-auto">
        <Back />
        <p className=" page-title">Add Dish</p>
        <form onSubmit={onCreate}>
          <Input
            register={register("name", {
              required: "Please provide a name for your dish.",
            })}
            containerClassName=" mb-3"
            label="Name"
          />
          <Input
            register={register("description")}
            containerClassName=" mb-3"
            label="Description (Optional)"
          />
          <Input
            register={register("price", {
              valueAsNumber: true,
              required: "Please provide a price for your dish.",
            })}
            containerClassName=" mb-6"
            label="Price"
            type="number"
            prefix={<p className=" text-gray-400 px-2">$</p>}
          />
          <ImagePicker
            containerClassName=" mb-6"
            label="Upload a photo"
            onSelectFile={(file) => setPhoto(file)}
          />
          <Button
            className=" w-full"
            appearance="primary"
            disabled={!formState.isValid || loading}
            intent="primary"
            loading={loading}
            loadingLabel={loadingLabel}
            onClick={onCreate}
          >
            Create Dish
          </Button>
          {error && <ErrorMessage className=" mt-2">{error}</ErrorMessage>}
        </form>
      </div>
    </PageContainer>
  );
};

export default AddDish;
