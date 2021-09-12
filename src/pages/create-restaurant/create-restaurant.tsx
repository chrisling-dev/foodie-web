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

interface IFormProps {
  name: string;
  description: string;
}
const CreateRestaurant = () => {
  const { register, formState } = useForm<IFormProps>({
    mode: "onChange",
  });
  const [coverImage, setCoverImage] = useState<File | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("Creating Restaurant");

  const onCreateRestaurant = () => {
    let backgroundImage;
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
          setError(
            "We couldn't upload your cover photo. Please use an image file or try again later."
          );
          return;
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setLoadingLabel("Creating Restaurant");
            backgroundImage = downloadURL;
          });
        }
      );
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
          disabled={!formState.isValid}
          intent="primary"
          loading={loading}
          loadingLabel={loadingLabel}
          onClick={onCreateRestaurant}
        >
          Create Restaurant
        </Button>
      </div>
    </PageContainer>
  );
};

export default CreateRestaurant;
