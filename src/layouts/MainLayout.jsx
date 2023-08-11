import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";

const MainLayout = () => {
  return (
    <>
      {/* NAVBAR SECTION */}
      <Navbar></Navbar>
      {/* OUTLET SECTION */}
      <Outlet></Outlet>
      {/* FOOTER SECTION */}
      <Footer></Footer>
    </>
  );
};

export default MainLayout;
