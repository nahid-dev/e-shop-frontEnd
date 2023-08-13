import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import "./Dashboard.css";
import { BsCart4 } from "react-icons/bs";
import Hamburger from "hamburger-react";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const item = (
    <>
      <li>
        <NavLink
          to="/dashboard/overview"
          className={({ isActive }) => (isActive ? "active" : "default")}
        >
          Overview
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/customerList"
          className={({ isActive }) => (isActive ? "active" : "default")}
        >
          Customer List
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/orderList"
          className={({ isActive }) => (isActive ? "active" : "default")}
        >
          Order List
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/productList"
          className={({ isActive }) => (isActive ? "active" : "default")}
        >
          Product List
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="flex bg-white">
      {/* SIDEBAR LARGE DEVICE */}
      <div className="w-1/6 border h-screen hidden md:block text-center px-2 py-5">
        {/* LOGO */}
        <div className="my-5 mb-10">
          <Link
            to="/"
            className="  inline-block p-1 border-2 rounded border-[#3a3a3a]"
          >
            <div className="flex items-center justify-center">
              <BsCart4 className="color-one" size={34}></BsCart4>
              <span className="font-extrabold color-two text-xl">E-SHOP</span>
            </div>
          </Link>
        </div>
        <ul className="space-y-6 ">{item}</ul>
        <div className="py-5">
          <Link
            className="hover:border-2 border-[#ff084e] hover:bg-transparent hover:text-[#ff084e] duration-200 transition-all py-2 px-5 bg-[#3a3a3a] text-white font-semibold rounded "
            to="/"
          >
            Home
          </Link>
        </div>
      </div>

      <div className=" w-full">
        {/* MOBILE MENU */}
        <div className="md:hidden">
          <nav className="flex items-center w-full justify-between py-3 px-3">
            <div>
              <Link
                to="/"
                className="flex items-center border-2 border-[#3a3a3a] p-1 rounded"
              >
                <BsCart4 className="color-one" size={34}></BsCart4>
                <span className="font-extrabold color-two text-xl">E-SHOP</span>
              </Link>
            </div>
            <div className="md:hidden">
              <div>
                <span onClick={() => setIsOpen(!isOpen)}>
                  <Hamburger size={22}></Hamburger>
                </span>
              </div>
              <div>
                <ul
                  className={`absolute primary-bg top-[72px] shadow  w-2/3  px-5 py-5 text-center space-y-5  h-screen transition-all duration-300 bg-white z-50 ${
                    isOpen ? "left-0" : "-left-[527px]"
                  }`}
                >
                  {item}
                  <div className="py-5">
                    <Link
                      className="hover:border-2 border-[#ff084e] hover:bg-transparent hover:text-[#ff084e] duration-200 transition-all py-2 px-5 bg-[#3a3a3a] text-white font-semibold rounded "
                      to="/"
                    >
                      Home
                    </Link>
                  </div>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        {/* CONTENT AREA */}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
<h1>Dashboard</h1>;
