import React from "react";
import Lottie from "react-lottie";
import loadingAnimation from "../../assets/animations/loading-animation.json";

const Loader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return <Lottie options={defaultOptions} height={45} width={45} />;
};

export default Loader;
