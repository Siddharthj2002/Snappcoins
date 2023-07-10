import React from "react";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%",
        backgroundColor: "black",
      }}
    >
      <div
        style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          border: "8px solid pink",
          borderTop: "8px solid transparent",
          animation: "spin 10s linear infinite", // Increase animation duration to 2 seconds
          animationTimingFunction: "linear", // Change the timing function to linear
        }}
      ></div>
    </div>
  );
};

export default Loader;
