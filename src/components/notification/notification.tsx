import React from "react";

const Notification = () => {
  return (
    <span className="flex h-3 w-3 items-center justify-center">
      <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-primary opacity-75"></span>
      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
    </span>
  );
};

export default Notification;
