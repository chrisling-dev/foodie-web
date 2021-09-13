import { useState } from "react";
import { useForm } from "react-hook-form";
import { getApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import Back from "../../components/back/back";
import Button from "../../components/button/button";
import ImagePicker from "../../components/image-picker/image-picker";
import Input from "../../components/input/input";
import PageContainer from "../../components/page-container/page-container";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  createRestaurant,
  createRestaurantVariables,
} from "../../__generated__/createRestaurant";
import { MY_RESTAURANTS } from "../dashboard/dashboard";
import { myRestaurants } from "../../__generated__/myRestaurants";
import ErrorMessage from "../../components/error-message/error-message";
import { useHistory } from "react-router-dom";
import { UPLOAD_FAILED_MESSAGE } from "../../utils/constants";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
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
        orderCounts
      }
    }
  }
`;

interface IFormProps {
  name: string;
  description: string;
}
const CreateRestaurant = () => {
  const history = useHistory();
  const { register, formState, getValues } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [coverImage, setCoverImage] = useState<File | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Creating Restaurant");

  const apolloClient = useApolloClient();
  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted: ({ createRestaurant }) => {
      setLoading(false);
      if (createRestaurant.ok && createRestaurant.restaurant) {
        const oldData = apolloClient.readQuery<myRestaurants>({
          query: MY_RESTAURANTS,
        });
        if (oldData) {
          apolloClient.writeQuery({
            query: MY_RESTAURANTS,
            data: {
              ...oldData,
              myRestaurants: {
                ...oldData?.myRestaurants,
                ok: true,
                restaurants: [
                  ...(oldData?.myRestaurants.restaurants
                    ? oldData?.myRestaurants.restaurants
                    : []),
                  createRestaurant.restaurant,
                ],
              },
            },
          });
        }

        history.push(`/my-restaurant/${createRestaurant.restaurant.id}`);
      }
    },
  });

  const onCreateRestaurant = () => {
    const { name, description } = getValues();
    setLoading(true);
    if (coverImage) {
      setLoadingLabel("Uploading cover photo...");
      const storage = getStorage(getApp());
      const imageRef = ref(
        storage,
        `/restaurants/cover-photo/${Date.now() + coverImage.name}`
      );
      const uploadTask = uploadBytesResumable(imageRef, coverImage);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          setLoading(false);
          setError(UPLOAD_FAILED_MESSAGE);
          return;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLoadingLabel("Creating Restaurant");
            createRestaurantMutation({
              variables: {
                input: {
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
      createRestaurantMutation({
        variables: {
          input: {
            name,
            description,
          },
        },
      });
    }
  };

  const onSelectFile = (file: File) => {
    setCoverImage(file);
  };

  return (
    <PageContainer className=" flex flex-col items-center">
      <div className=" w-full sm:max-w-sm">
        <Back />
        <p className=" page-title">New Restaurant</p>
        <Input
          label="Name"
          register={register("name", {
            required: true,
          })}
        />
        <Input
          label="Description"
          register={register("description", {
            required: true,
          })}
        />
        <ImagePicker
          containerClassName={" mt-3"}
          label="Upload a Cover Photo"
          onSelectFile={onSelectFile}
        />
        <Button
          className=" w-full mt-4"
          appearance="primary"
          disabled={!formState.isValid || loading}
          intent="primary"
          loading={loading}
          loadingLabel={loadingLabel}
          onClick={onCreateRestaurant}
        >
          Create Restaurant
        </Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {data?.createRestaurant.error && (
          <ErrorMessage>{data.createRestaurant.error.message}</ErrorMessage>
        )}
      </div>
    </PageContainer>
  );
};

export default CreateRestaurant;
