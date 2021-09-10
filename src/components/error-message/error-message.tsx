import React from "react";

interface IProps {
  align?: "left" | "center" | "right";
  className?: string;
}
const ErrorMessage: React.FC<IProps> = ({
  children,
  align = "center",
  className,
}) => {
  const getAlignment = () => {
    switch (align) {
      case "left":
        return " text-left";
      case "right":
        return " text-right";
      default:
        return " text-center";
    }
  };
  return (
    <p className={` text-red-400 text-sm ${getAlignment()} ${className}`}>
      {children}
    </p>
  );
};

export default ErrorMessage;
