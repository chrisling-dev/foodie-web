import React from "react";
import { useParams } from "react-router";

const MyOrder = () => {
  const { id } = useParams<{ id: string }>();

  return <div></div>;
};

export default MyOrder;
