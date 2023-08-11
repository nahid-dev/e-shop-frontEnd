import React from "react";
import ContentWrapper from "../shared/contentWrapper/ContentWrapper";

const Footer = () => {
  return (
    <div className="border-t border-[#3a3a3a] text-center py-5 mt-5">
      <ContentWrapper>
        <div className="">
          <p>
            &copy; <span className="color-one">E-SHOP</span> all rights
            reserve-2023
          </p>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Footer;
