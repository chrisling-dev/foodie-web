import { gql, useQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import Button from "../../components/button/button";
import Loader from "../../components/loader/loader";
import PageContainer from "../../components/page-container/page-container";
import { myRestaurants } from "../../__generated__/myRestaurants";
import MyRestaurantCard from "./my-restaurant-card/my-restaurant-card";

export const MY_RESTAURANTS = gql`
  query myRestaurants {
    myRestaurants {
      ok
      restaurants {
        id
        name
        description
        backgroundImage
        orderCounts
      }
    }
  }
`;
const Dashboard = () => {
  const history = useHistory();

  const { data, loading } = useQuery<myRestaurants>(MY_RESTAURANTS);
  return (
    <PageContainer>
      <div className=" w-full flex flex-col lg:flex-row">
        <div className=" flex flex-col w-full">
          <p className=" page-title">My Restaurants</p>
          {loading ? (
            <div className={"w-full flex items-center justify-center mt-20"}>
              <Loader />
            </div>
          ) : (
            <div className=" grid gap-3 w-full grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
              <div className=" w-full h-56 flex flex-col justify-between bg-primary rounded-lg p-3 shadow-md">
                <div className=" w-full text-white">
                  <p className=" font-semibold text-white mb-2">
                    Start Selling!
                  </p>
                  <p>
                    Starting a restaurant on{" "}
                    <span className=" font-semibold">foodie</span> allows you to
                    sell as many dishes as you want to millions of users!
                  </p>
                </div>
                <div className=" w-full flex items-center justify-end">
                  <Button
                    className=" bg-gray-50 bg-opacity-50"
                    appearance="minimal"
                    onClick={() => history.push("/create-restaurant")}
                  >
                    + New Restaurant
                  </Button>
                </div>
              </div>
              {data?.myRestaurants.restaurants.map((restaurant) => (
                <MyRestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          )}
        </div>
        <div className=" w-full lg:max-w-xs">
          <p className=" page-title mt-4 lg:mt-0 lg:pl-3">Recent Activities</p>
        </div>
      </div>
    </PageContainer>
  );
};

export default Dashboard;
