import { gql, useMutation } from "@apollo/client";
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
import { getDishById_getDishById_dish } from "../../../__generated__/getDishById";
import {
  updateDish,
  updateDishVariables,
} from "../../../__generated__/updateDish";

const UPDATE_DISH_MUTATION = gql`
  mutation updateDish($input: UpdateDishInput!) {
    updateDish(input: $input) {
      ok
      error {
        code
        message
      }
      dish {
        id
        name
        description
        price
        photo
      }
    }
  }
`;
interface IProps {
  dish: getDishById_getDishById_dish;
}
interface IFormProps {
  name: string;
  description?: string | null;
  price: number;
}
const EditDishForm: React.FC<IProps> = ({ dish }) => {
  const [customError, setCustomError] = useState<string | "">();
  const [loading, setLoading] = useState<string | undefined>();
  const [photo, setPhoto] = useState<File>();
  const { formState, register, getValues, reset } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      name: dish.name,
      description: dish.description,
      price: dish.price,
    },
  });

  const [updateDishMutation] = useMutation<updateDish, updateDishVariables>(
    UPDATE_DISH_MUTATION,
    {
      onCompleted: ({ updateDish: { ok, error } }) => {
        setLoading(undefined);
        if (ok) {
          toast.success("Changes saved!");
          reset({
            name: dish.name,
            description: dish.description,
            price: dish.price,
          });
        } else if (error) {
          toast.error("Could not update dish!");
          setCustomError(error.message);
        }
      },
    }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, price } = getValues();
    if (isNaN(price)) return setCustomError("Price must be a number!");
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
            updateDishMutation({
              variables: {
                input: {
                  id: dish.id,
                  name,
                  description,
                  price,
                  photo: downloadURL,
                },
              },
            });
          });
        }
      );
    } else {
      setLoading("Saving changes");
      updateDishMutation({
        variables: {
          input: {
            id: dish.id,
            name,
            description,
            price,
          },
        },
      });
    }
  };

  return (
    <div className=" w-full">
      <p className=" page-title mb-2">{dish.name}</p>
      <p className=" text-gray-500">{dish.description}</p>
      <form className=" mt-6" onSubmit={onSubmit}>
        <Input label="Name" register={register("name", { required: true })} />
        <Input
          containerClassName=" mt-3"
          label="Description"
          register={register("description")}
        />
        <Input
          containerClassName=" mt-3"
          label="Price"
          prefix={<p className=" text-gray-400 px-2">$</p>}
          register={register("price", { valueAsNumber: true })}
          type={"number"}
          step={"0.01"}
        />
        <ImagePicker
          containerClassName=" mt-6"
          label={dish.photo ? "Change dish photo" : "Upload a photo"}
          defaultFile={dish.photo || undefined}
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

export default EditDishForm;
