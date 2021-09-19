import React from "react";
import ErrorMessage from "../../components/error-message/error-message";
import Loader from "../../components/loader/loader";
import OrderRow from "../../components/order-row/order-row";
import PageContainer from "../../components/page-container/page-container";
import useGetOrders from "../../hooks/queries/useGetOrders";

const MyOrders = () => {
  const { data, loading, orders, refetch } = useGetOrders({
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });

  return (
    <PageContainer>
      <div className=" flex items-center justify-between">
        <p className=" page-title">My Orders</p>
        <span className=" link" onClick={() => refetch()}>
          Refresh
        </span>
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
