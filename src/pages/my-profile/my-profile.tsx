import Button from "../../components/button/button";
import PageContainer from "../../components/page-container/page-container";
import useMe from "../../hooks/queries/useMe";
import useSignOut from "../../hooks/useSignOut";

const MyProfile = () => {
  const signOut = useSignOut();
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
          <Button className=" my-4" intent="primary">
            Start selling on foodie
          </Button>
          <Button appearance="minimal" intent="danger" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </PageContainer>
  );
};

export default MyProfile;
