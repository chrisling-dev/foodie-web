import React from "react";

interface IProps {
  containerClassName?: string;
  isChecked?: boolean;
  message?: string;
  onCheck?: () => void;
}
const Checkbox: React.FC<IProps> = ({
  containerClassName,
  isChecked,
  message,
  onCheck,
}) => {
  return (
    <div className={`  w-full flex items-center ${containerClassName}`}>
      <div
        className=" flex items-center justify-center rounded-md border border-solid border-gray-300 cursor-pointer hover:border-primary"
        onClick={onCheck}
        style={{ padding: "2px", borderRadius: "4px" }}
      >
        <div
          className={` h-2 w-2 bg-primary rounded-sm transform-300 ${
            isChecked ? "bg-opacity-100" : "bg-opacity-0"
          }`}
        />
      </div>
      <div className=" flex flex-1 ml-2">
        <p className={` text-gray-500 text-sm italic`}>{message}</p>
      </div>
    </div>
  );
};

export default Checkbox;
