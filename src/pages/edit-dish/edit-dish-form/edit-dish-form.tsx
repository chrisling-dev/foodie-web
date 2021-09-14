import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Button from "../../../components/button/button";
import ImagePicker from "../../../components/image-picker/image-picker";
import Input from "../../../components/input/input";
import { getDishById_getDishById_dish } from "../../../__generated__/getDishById";

interface IProps {
  dish: getDishById_getDishById_dish;
}
interface IFormProps {
  name: string;
  description?: string | null;
  price: number;
}
const EditDishForm: React.FC<IProps> = ({ dish }) => {
  const [photo, setPhoto] = useState<File>();
  const { formState, register, getValues } = useForm<IFormProps>({
    mode: "onChange",
    defaultValues: {
      name: dish.name,
      description: dish.description,
      price: dish.price,
    },
  });

  const onSubmit = (e: React.FormEvent) => {};

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
          disabled={!formState.isValid || (!formState.isDirty && !photo)}
        >
          Save Changes
        </Button>
      </form>
    </div>
  );
};

export default EditDishForm;
