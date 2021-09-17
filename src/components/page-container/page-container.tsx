import React from "react";

interface IProps {
  className?: string;
  override?: boolean;
}
const PageContainer: React.FC<IProps> = ({ children, className, override }) => {
  return (
    <div
      className={
        override ? className : ` w-full px-4 md:px-10pc pt-8 ${className}`
      }
    >
      {children}
    </div>
  );
};

export default PageContainer;
