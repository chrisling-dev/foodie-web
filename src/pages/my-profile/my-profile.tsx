import { useState } from "react";
import Button from "../../components/button/button";
import Input from "../../components/input/input";
import Modal from "../../components/modal/modal";
import PageContainer from "../../components/page-container/page-container";
import useMe from "../../hooks/queries/useMe";
import useSignOut from "../../hooks/useSignOut";

const MyProfile = () => {
  const signOut = useSignOut();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const { data } = useMe();

  return (
    <PageContainer>
      <div className=" w-full">
        <p className=" page-title">My Profile</p>
        <div className=" w-full p-4 bg-blue-50 rounded-2xl shadow-lg text-gray-500">
          <div>
            <p className=" font-semibold">Name</p>
            <p>{data?.me?.name}</p>
          </div>
          <div className=" mt-4">
            <p className=" font-semibold">E-mail</p>
            <p>{data?.me?.email}</p>
          </div>
        </div>
        <div className=" w-full flex items-center justify-center flex-col mt-12">
          <Button
            className=" my-4"
            intent="primary"
            onClick={setShowConfirmation.bind(this, true)}
          >
            Start selling on foodie
          </Button>
          <Button appearance="minimal" intent="danger" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
      <Modal title="Switching to Seller Profile" showModal={showConfirmation}>
        <p className=" text-sm">
          By confirming, your account will be{" "}
          <span className=" italic text-red-400 font-semibold">
            permanently
          </span>{" "}
          switched to a seller account. This means that:
          <br />
          <p className=" italic mt-4">
            1) You will be able to sell your food like others do on our Explore
            page.
          </p>
          <p className=" italic mt-4">
            2) You won't be able to order from any restaurants with this account
            on Foodie.
          </p>
        </p>
        <br />
        <p className=" text-xs italic">
          To confirm, please repeat your e-mail{" "}
          <span className=" bg-primary text-white px-1 rounded-md">
            {data?.me?.email}
          </span>{" "}
          below.
        </p>
        <Input containerClassName="mt-2" placeholder={data?.me?.email} />
      </Modal>
    </PageContainer>
  );
};

export default MyProfile;
