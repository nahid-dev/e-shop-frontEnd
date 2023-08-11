import React from "react";
import { HashLoader } from "react-spinners";

const Loader = ({ loading }) => {
  const color = "#ff084e";

  return (
    <div className="flex justify-center items-center h-[300px]">
      <HashLoader
        color={color}
        loading={loading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
