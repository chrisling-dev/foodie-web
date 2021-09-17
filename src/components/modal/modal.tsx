import React, { useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";

interface IProps {
  customComponent?: any;
  showModal?: boolean;
  title?: string;
  onClose?: () => void;
}
const Modal: React.FC<IProps> = ({
  children,
  customComponent,
  showModal,
  title,
  onClose,
}) => {
  const modalRef = useRef(null);

  useOnClickOutside(modalRef, onClose);
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
          ref={modalRef}
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
