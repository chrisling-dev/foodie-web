import React, { useState } from "react";
import { useParams } from "react-router";
import Back from "../../components/back/back";
import OrderDetails from "../../components/order-details/order-details";
import PageContainer from "../../components/page-container/page-container";
import useGetOrder from "../../hooks/queries/useGetOrder";
import { OrderStatusStatus } from "../../__generated__/globalTypes";

const MyOrder = () => {
  const { id } = useParams<{ id: string }>();
  const [done, setDone] = useState(false);

  const { data, loading, refetch } = useGetOrder({
    variables: {
      input: { id: +id },
    },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-and-network",
    pollInterval: done ? 0 : 1000,
    skip: isNaN(+id),
    onCompleted({ getOrder }) {
      if (getOrder.order?.status === OrderStatusStatus.Received) setDone(true);
    },
  });

  return (
    <PageContainer>
      <Back />
      <div className=" w-full">
        {!loading && data?.getOrder.order && (
          <OrderDetails order={data.getOrder.order} refetch={refetch} />
        )}
        {!loading && data?.getOrder.error?.message}
      </div>
    </PageContainer>
  );
};

export default MyOrder;
