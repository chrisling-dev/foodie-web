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
import { toast } from "react-toastify";
import Button from "../../../components/button/button";
import ErrorMessage from "../../../components/error-message/error-message";
import ImagePicker from "../../../components/image-picker/image-picker";
import Input from "../../../components/input/input";
import { UPLOAD_FAILED_MESSAGE } from "../../../utils/constants";
import {
  myRestaurant,
  myRestaurant_myRestaurant_restaurant,
} from "../../../__generated__/myRestaurant";
import {
  updateRestaurant,
  updateRestaurantVariables,
} from "../../../__generated__/updateRestaurant";
import { MY_RESTAURANT_QUERY } from "../../my-restaurant/my-restaurant";

const UPDATE_RESTAURANT_MUTATION = gql`
  mutation updateRestaurant($input: UpdateRestaurantInput!) {
    updateRestaurant(input: $input) {
      ok
      error {
        code
        message
      }
      restaurant {
        id
        name
        description
        name
        backgroundImage
      }
    }
  }
`;
interface IProps {
  restaurant: myRestaurant_myRestaurant_restaurant;
}
interface IFormProps {
  name: string;
  description?: string | null;
}
const EditRestaurantForm: React.FC<IProps> = ({ restaurant }) => {
  const [customError, setCustomError] = useState<string | "">();
  const [loading, setLoading] = useState<string | undefined>();
  const [photo, setPhoto] = useState<File>();
  const { formState, register, getValues, reset } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      name: restaurant.name,
      description: restaurant.description,
    },
  });

  const apolloClient = useApolloClient();
  const [updateRestaurantMutation] = useMutation<
    updateRestaurant,
    updateRestaurantVariables
  >(UPDATE_RESTAURANT_MUTATION, {
    onCompleted: ({ updateRestaurant: { ok, error, restaurant } }) => {
      setLoading(undefined);
      if (ok) {
        toast.success("Changes saved!");

        const variables = {
          input: {
            id: restaurant?.id,
          },
        };
        const currentData = apolloClient.readQuery<myRestaurant>({
          query: MY_RESTAURANT_QUERY,
          variables,
        });
        if (currentData) {
          apolloClient.writeQuery({
            query: MY_RESTAURANT_QUERY,
            variables,
            data: {
              ...currentData,
              myRestaurant: {
                ...currentData.myRestaurant,
                restaurant: {
                  ...currentData.myRestaurant.restaurant,
                  ...restaurant,
                },
              },
            },
          });
        }
        reset({
          name: restaurant?.name,
          description: restaurant?.description,
        });
      } else if (error) {
        toast.error("Could not update dish!");
        setCustomError(error.message);
      }
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description } = getValues();
    setCustomError("");

    if (photo) {
      setLoading("Uploading photo");
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
          setLoading(undefined);
          setCustomError(UPLOAD_FAILED_MESSAGE);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLoading("Saving changes");
            updateRestaurantMutation({
              variables: {
                input: {
                  id: restaurant.id,
                  name,
                  description,
                  backgroundImage: downloadURL,
                },
              },
            });
          });
        }
      );
    } else {
      setLoading("Saving changes");
      updateRestaurantMutation({
        variables: {
          input: {
            id: restaurant.id,
            name,
            description,
          },
        },
      });
    }
  };

  return (
    <div className=" w-full">
      <p className=" page-title mb-2">{restaurant.name}</p>
      <p className=" text-gray-500">{restaurant.description}</p>
      <form className=" mt-6" onSubmit={onSubmit}>
        <Input label="Name" register={register("name", { required: true })} />
        <Input
          containerClassName=" mt-3"
          label="Description"
          register={register("description")}
        />
        <ImagePicker
          containerClassName=" mt-6"
          label={
            restaurant.backgroundImage ? "Change dish photo" : "Upload a photo"
          }
          defaultFile={restaurant.backgroundImage || undefined}
          onSelectFile={(file) => setPhoto(file)}
        />
        <Button
          className=" w-full mt-6"
          appearance={"primary"}
          intent="primary"
          loading={Boolean(loading)}
          loadingLabel={loading}
          disabled={
            Boolean(loading) ||
            !formState.isValid ||
            (!formState.isDirty && !photo)
          }
        >
          Save Changes
        </Button>
        <ErrorMessage className=" mt-2">{customError}</ErrorMessage>
      </form>
    </div>
  );
};

export default EditRestaurantForm;
