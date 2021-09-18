import React from "react";
import Lottie from "react-lottie";
interface IProps {
  animation: any;
  size?: number;
  speed?: number;
}
const Animation: React.FC<IProps> = ({ animation, size = 45, speed = 1 }) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={defaultOptions}
      height={size}
      width={size}
      speed={speed}
      isClickToPauseDisabled={true}
    />
  );
};

export default Animation;
