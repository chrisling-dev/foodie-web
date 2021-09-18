import React, { useState } from "react";
import { useParams } from "react-router";
import Back from "../../components/back/back";
import PageContainer from "../../components/page-container/page-container";
import useGetOrder from "../../hooks/queries/useGetOrder";
import { OrderStatusStatus } from "../../__generated__/globalTypes";

const MyOrder = () => {
  const { id } = useParams<{ id: string }>();
  const [done, setDone] = useState(false);
  const { data } = useGetOrder({
    variables: {
      input: { id: +id },
    },
    pollInterval: done ? 0 : 1000,
    skip: isNaN(+id),
    onCompleted({ getOrder }) {
      if (getOrder.order?.status === OrderStatusStatus.Delivered) setDone(true);
    },
  });

  return (
    <PageContainer>
      <Back />
      <div></div>
    </PageContainer>
  );
};

export default MyOrder;
