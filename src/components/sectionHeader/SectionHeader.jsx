import React from "react";

const SectionHeader = ({ title }) => {
  return (
    <div className="text-center my-10 bg-white">
      <h2 className="md:text-[48px] text-3xl font-bold uppercase color-two">
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
