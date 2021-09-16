import React from "react";

interface IProps {
  className?: string;
}
const PageContainer: React.FC<IProps> = ({ children, className }) => {
  return (
    <div className={` w-full px-4 md:px-10pc pt-8 ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
