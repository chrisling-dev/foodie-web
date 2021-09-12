import React from "react";
import { useForm } from "react-hook-form";
import Back from "../../components/back/back";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import PageContainer from "../../components/page-container/page-container";

interface IFormProps {
  name: string;
  description: string;
}
const CreateRestaurant = () => {
  const { register, formState } = useForm<IFormProps>({
    mode: "onChange",
  });
  return (
    <PageContainer>
      <div className=" w-full max-w-sm">
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
        <Button
          className=" w-full mt-4"
          appearance="primary"
          disabled={!formState.isValid}
          intent="primary"
        >
          Create Restaurant
        </Button>
      </div>
    </PageContainer>
  );
};

export default CreateRestaurant;
