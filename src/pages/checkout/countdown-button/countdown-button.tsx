import React, { useEffect, useState } from "react";
import Button from "../../../components/button/button";

interface IProps {
  interval?: number;
  times?: number;
  onClick?: any;
  onDone?: any;
  message?: (time: number) => string;
}

const CountdownButton: React.FC<IProps> = ({
  interval = 1000,
  times = 5,
  onClick,
  onDone,
  message,
}) => {
  const [countdown, setCountdown] = useState(times);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        typeof onDone === "function" && onDone();
      }
    }, interval);
    // clean up timeout to prevent memory leak
    return () => clearTimeout(timeoutId);
  });

  return (
    <Button
      className=" w-full mt-3"
      onClick={typeof onClick === "function" ? onClick : () => {}}
      appearance="primary"
      intent="primary"
    >
      {typeof message === "function" ? message(countdown) : countdown}
    </Button>
  );
};

export default CountdownButton;
