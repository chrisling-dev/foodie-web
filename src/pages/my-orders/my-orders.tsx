import React from "react";
import { useParams } from "react-router";
import Back from "../../components/back/back";
import ErrorMessage from "../../components/error-message/error-message";
import Loader from "../../components/loader/loader";
import OrderRow from "../../components/order-row/order-row";
import PageContainer from "../../components/page-container/page-container";
import useGetOrders from "../../hooks/queries/useGetOrders";

const MyOrders = () => {
  const { restaurantId } = useParams<{ restaurantId?: string }>();
  const { data, loading, orders, refetch } = useGetOrders({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    variables: {
      input: {
        id: restaurantId && !isNaN(+restaurantId) ? +restaurantId : null,
      },
    },
  });

  return (
    <PageContainer>
      <div className=" flex items-center justify-between mb-4">
        <div>
          {restaurantId && <Back />}
          <p className=" page-title mb-1">
            My Orders{" "}
            <span
              className=" link text-sm ml-2 font-normal"
              onClick={() => refetch()}
            >
              Refresh
            </span>
          </p>
          {data?.getOrders.restaurant && (
            <p className=" text-gray-500 text-sm">
              {data?.getOrders.restaurant.name}
            </p>
          )}
        </div>
      </div>
      <div>
        {loading && <Loader />}
        {data?.getOrders.error && (
          <ErrorMessage>{data.getOrders.error.message}</ErrorMessage>
        )}
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-3">
          {orders?.map((order) => (
            <OrderRow key={`${order.id}`} order={order} />
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

export default MyOrders;
