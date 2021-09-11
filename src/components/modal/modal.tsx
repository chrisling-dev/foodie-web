import React from "react";

interface IProps {
  customComponent?: any;
  primaryLabel?: string;
  primaryAction?: any;
  primaryIntent?: "none" | "success" | "danger" | "primary";
  primaryDisabled?: boolean;
  secondaryLabel?: string;
  secondaryAction?: any;
  secondaryIntent?: "none" | "success" | "danger" | "primary";
  secondaryDisabled?: boolean;
  showModal?: boolean;
  title?: string;
}
const Modal: React.FC<IProps> = ({
  children,
  customComponent,
  primaryLabel,
  primaryAction,
  primaryIntent,
  primaryDisabled,
  secondaryLabel,
  secondaryAction,
  secondaryIntent,
  secondaryDisabled,
  showModal,
  title,
}) => {
  return (
    <div
      className={` fixed z-50 p-4 top-0 left-0 w-screen h-screen bg-gray-600 flex items-center justify-center transform-300 ${
        showModal
          ? " opacity-100 bg-opacity-70"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {customComponent ? (
        customComponent
      ) : (
        <div
          className={`w-full max-w-sm bg-white shadow-md rounded-lg p-4 duration-500 ${
            showModal ? " translate-y-0" : " translate-y-full"
          }`}
        >
          <p className=" font-semibold">{title}</p>
          {children}
        </div>
      )}
    </div>
  );
};

export default Modal;
