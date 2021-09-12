import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "../../components/button/button";
import ErrorMessage from "../../components/error-message/error-message";
import Input from "../../components/input/input";
import Modal from "../../components/modal/modal";
import PageContainer from "../../components/page-container/page-container";
import useMe, { ME_QUERY } from "../../hooks/queries/useMe";
import useInput from "../../hooks/useInput";
import useSignOut from "../../hooks/useSignOut";
import { UserRole } from "../../__generated__/globalTypes";
import { me } from "../../__generated__/me";
import { switchToRestaurantOwner } from "../../__generated__/switchToRestaurantOwner";

const SWITCH_TO_RESTAURANT_OWNER_MUTATION = gql`
  mutation switchToRestaurantOwner {
    switchToRestaurantOwner {
      ok
      error {
        code
        message
      }
    }
  }
`;

const MyProfile = () => {
  const history = useHistory();
  const signOut = useSignOut();
  const { data: userData } = useMe();
  const email = useInput();
  const apolloClient = useApolloClient();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const [switchToRestaurantOwnerMutation, { data, loading }] =
    useMutation<switchToRestaurantOwner>(SWITCH_TO_RESTAURANT_OWNER_MUTATION, {
      onCompleted: ({ switchToRestaurantOwner: { ok, error } }) => {
        if (ok) {
          const oldData = apolloClient.readQuery<me>({ query: ME_QUERY });
          apolloClient.writeQuery<me>({
            query: ME_QUERY,
            data: {
              me: oldData?.me
                ? {
                    ...oldData?.me,
                    role: UserRole.RestaurantOwner,
                  }
                : null,
            },
          });
          history.push("/");
        }
      },
    });

  return (
    <PageContainer>
      <div className=" w-full">
        <p className=" page-title">My Profile</p>
        <div className=" w-full p-4 bg-blue-50 rounded-2xl shadow-lg text-gray-500">
          <div>
            <p className=" font-semibold">Name</p>
            <p>{userData?.me?.name}</p>
          </div>
          <div className=" mt-4">
            <p className=" font-semibold">E-mail</p>
            <p>{userData?.me?.email}</p>
          </div>
        </div>
        <div className=" w-full flex items-center justify-center flex-col mt-12">
          {userData?.me?.role !== UserRole.RestaurantOwner && (
            <Button
              className=" my-4"
              intent="primary"
              onClick={setShowConfirmation.bind(this, true)}
            >
              Start selling on foodie
            </Button>
          )}
          <Button appearance="minimal" intent="danger" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
      <Modal title="Switching to Seller Profile" showModal={showConfirmation}>
        <div className=" text-sm mt-2">
          <p>By confirming, your account will be </p>
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
        </div>
        <br />
        <p className=" text-xs italic">
          To confirm, please repeat your e-mail{" "}
          <span className=" bg-primary text-white px-1 rounded-md">
            {userData?.me?.email}
          </span>{" "}
          below.
        </p>
        <Input
          containerClassName="mt-2"
          placeholder={userData?.me?.email}
          {...email.inputProps}
        />
        <Button
          appearance="primary"
          className=" mt-4"
          disabled={email.value !== userData?.me?.email || loading}
          fill={true}
          intent="danger"
          loading={loading}
          onClick={() => switchToRestaurantOwnerMutation()}
        >
          Switch to Seller Profile
        </Button>
        {data?.switchToRestaurantOwner.error && (
          <ErrorMessage>
            {data?.switchToRestaurantOwner.error?.message}
          </ErrorMessage>
        )}
        <Button
          className=" mt-3"
          fill={true}
          onClick={setShowConfirmation.bind(this, false)}
        >
          Cancel
        </Button>
      </Modal>
    </PageContainer>
  );
};

export default MyProfile;
