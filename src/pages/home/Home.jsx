import React from "react";
import HomeBanner from "../../components/homeBanner/HomeBanner";
import AllProduct from "../../components/allProduct/AllProduct";

const Home = () => {
  return (
    <div>
      {/* BANNER SECTION */}
      <HomeBanner></HomeBanner>
      {/* ALL PRODUCT SHOW HERE */}
      <AllProduct></AllProduct>
    </div>
  );
};

export default Home;
