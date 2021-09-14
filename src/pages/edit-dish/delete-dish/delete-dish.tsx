import React, { useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "../../../components/button/button";
import Modal from "../../../components/modal/modal";
import { getDishById_getDishById_dish } from "../../../__generated__/getDishById";

interface IProps {
  dish: getDishById_getDishById_dish;
}
const DeleteDish: React.FC<IProps> = ({ dish }) => {
  console.log(dish);
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div
        className=" text-red-400 flex p-2 rounded-md items-center group cursor-pointer hover:bg-red-400 hover:text-white transform-300"
        onClick={setShowModal.bind(this, true)}
      >
        <p className=" mr-2 w-0 text-right overflow-hidden truncate group-hover:w-14 transform-300">
          Delete
        </p>
        <FaRegTrashAlt />
      </div>
      <Modal title={`Delete ${dish.name}?`} showModal={showModal}>
        <p className=" text-gray-500 text-sm mt-2">
          Are you sure you want to delete{" "}
          <span className=" italic font-semibold">{dish.name}</span>?
        </p>
        <div className=" flex flex-col w-full mt-4 pt-4 border-solid border-t border-gray-200">
          <Button className=" mb-3" appearance={"primary"} intent={"danger"}>
            Confirm Delete
          </Button>
          <Button>Cancel</Button>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteDish;
