import React from "react";
import Back from "../../components/back/back";
import Button from "../../components/button/button";
import ImagePicker from "../../components/image-picker/image-picker";
import Input from "../../components/input/input";
import PageContainer from "../../components/page-container/page-container";

const AddDish = () => {
  return (
    <PageContainer>
      <div className=" w-full max-w-md mx-auto">
        <Back />
        <p className=" page-title">Add Dish</p>
        <form>
          <Input containerClassName=" mb-3" label="Name" />
          <Input containerClassName=" mb-3" label="Description (Optional)" />
          <Input
            containerClassName=" mb-6"
            label="Price"
            prefix={<p className=" text-gray-400 px-2">$</p>}
          />
          <ImagePicker containerClassName=" mb-6" label="Upload a photo" />
          <Button className=" w-full" appearance="primary" intent="primary">
            Create Dish
          </Button>
        </form>
      </div>
    </PageContainer>
  );
};

export default AddDish;
