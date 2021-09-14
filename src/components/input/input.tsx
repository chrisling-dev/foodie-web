import React from "react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import ErrorMessage from "../error-message/error-message";

interface IProps extends React.HTMLProps<HTMLInputElement> {
  containerClassName?: string;
  error?: string;
  innerContainerClassName?: string;
  inputClassName?: string;
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  prefix?: any;
  register?: UseFormRegisterReturn;
  suffix?: any;
  type?: string;
}
const Input: React.FC<IProps> = ({
  containerClassName,
  error,
  innerContainerClassName,
  inputClassName,
  label,
  labelClassName,
  name,
  onBlur,
  onChange,
  placeholder,
  prefix,
  ref,
  register,
  suffix,
  step,
  type,
  value,
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
          className={`focus:outline-none text-gray-700 bg-transparent w-full caret-gray-400 truncate ${inputClassName}`}
          placeholder={placeholder}
          step={step}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          {...(register
            ? register
            : {
                onBlur,
                onChange,
                name,
                value,
              })}
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
      {error ? <ErrorMessage className=" mt-2">{error}</ErrorMessage> : ""}
    </div>
  );
};

export default Input;
