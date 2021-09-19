import React from "react";
import PageContainer from "../../components/page-container/page-container";
import useGetOrders from "../../hooks/queries/useGetOrders";

const MyOrders = () => {
  const { data, loading, orders } = useGetOrders({});
  return (
    <PageContainer>
      <p className=" page-title">My Orders</p>
      {orders?.map((order) => (
        <div>
          {order.id}: {order.status}
        </div>
      ))}
    </PageContainer>
  );
};

export default MyOrders;
