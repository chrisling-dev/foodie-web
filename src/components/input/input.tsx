import React from "react";
import { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

interface IProps extends React.HTMLProps<HTMLInputElement> {
  containerClassName?: string;
  innerContainerClassName?: string;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  prefix?: any;
  suffix?: any;
  type?: string;
}
const Input: React.FC<IProps> = ({
  containerClassName,
  innerContainerClassName,
  inputClassName,
  label,
  labelClassName,
  placeholder,
  prefix,
  suffix,
  type,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={` ${containerClassName}`}>
      <p className={` text-gray-500 ml-2 ${labelClassName}`}>{label}</p>
      <div
        className={`w-full bg-gray-50 shadow-inner px-3 py-2 rounded-lg flex items-center ${innerContainerClassName}`}
      >
        <div>{prefix}</div>
        <input
          className={`focus:outline-none bg-transparent w-full caret-gray-400 ${inputClassName}`}
          placeholder={placeholder}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
        />
        <div>
          {type === "password" ? (
            <div
              className=" text-gray-500 cursor-pointer hover:text-primary transform-300"
              onClick={setShowPassword.bind(this, !showPassword)}
            >
              {showPassword ? <IoMdEyeOff size={20} /> : <IoMdEye size={20} />}
            </div>
          ) : (
            suffix
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
