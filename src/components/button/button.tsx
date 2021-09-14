import React from "react";

type APPEARANCE = "default" | "primary" | "minimal";

type INTENT = "none" | "success" | "danger" | "primary";

interface AppearanceProps {
  [key: string]: string;
}

interface IButtonStyles {
  [key: string]: AppearanceProps;
}
interface IProps extends React.HTMLProps<HTMLButtonElement> {
  appearance?: APPEARANCE;
  intent?: INTENT;
  fill?: boolean;
  fontSize?: "sm" | "md" | "lg";
  loading?: boolean;
  loadingLabel?: string;
  type?: "button" | "submit" | "reset";
}
const Button: React.FC<IProps> = ({
  appearance = "default",
  children,
  className,
  disabled,
  fill = false,
  fontSize,
  intent = "none",
  loading,
  loadingLabel,
  tabIndex,
  type,
  onClick,
  onKeyDown,
}) => {
  const buttonStyles: IButtonStyles = {
    default: {
      none: " border border-solid border-gray-500 text-gray-500 hover:border-gray-700 hover:text-gray-700",
      success:
        " border border-solid border-green-400 text-green-400 hover:border-green-500 hover:text-green-500",
      danger:
        " border border-solid border-red-400 text-red-400 hover:border-red-500 hover:text-red-500",
      primary:
        " border border-solid border-primary text-primary hover:opacity-70",
      disabled: " border border-solid border-gray-300 text-gray-300",
    },
    primary: {
      none: " text-white bg-gray-300 shadow-lg hover:bg-gray-400 hover:shadow-md",
      success:
        " text-white bg-green-400 shadow-lg hover:bg-green-500 hover:shadow-md",
      danger:
        " text-white bg-red-400 shadow-lg hover:bg-red-500 hover:shadow-md",
      primary:
        " text-white bg-primary shadow-lg hover:bg-opacity-80 hover:shadow-md",
      disabled: " text-gray-300 bg-gray-100",
    },
    minimal: {
      none: " text-gray-500 hover:bg-gray-100 ",
      success: " text-green-400 hover:bg-green-50 ",
      danger: " text-red-400 hover:bg-red-50 ",
      primary: " text-primary hover:bg-yellow-100 ",
      disabled: " text-gray-300",
    },
  };
  const getSize = () => {
    switch (fontSize) {
      case "sm":
        return "text-sm";
      case "md":
        return "text-md";
      case "lg":
        return "text-lg";
      default:
        return "text-base";
    }
  };

  return (
    <button
      className={`${getSize()} ${
        buttonStyles[appearance][disabled ? "disabled" : intent]
      } ${disabled && "cursor-not-allowed"} ${
        fill && " w-full"
      } px-3 py-2 rounded-lg min-w-max transform duration-300 focus:outline-none ${className}`}
      disabled={disabled}
      onClick={disabled ? () => {} : onClick}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      type={type}
    >
      {loading ? loadingLabel || "Loading" : children}
    </button>
  );
};

export default Button;
