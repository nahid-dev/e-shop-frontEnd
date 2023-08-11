import React from "react";
import ContentWrapper from "../../components/shared/contentWrapper/ContentWrapper";
import { Link, NavLink } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import Hamburger from "hamburger-react";

const Navbar = () => {
  const user = true;
  const navItem = (
    <>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "default")}
          to="/"
        >
          Home
        </NavLink>
      </li>
      {user && (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "default")}
            to="/dashboard"
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {user ? (
        <li className="font-semibold md:text-lg bg-[#ff084e] text-white rounded px-2">
          <Link to="">Logout</Link>
        </li>
      ) : (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "default")}
            to="/login"
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className="shadow py-3">
      <ContentWrapper>
        {/* NAVBAR START */}
        <nav className="">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/" className="flex items-center">
                <BsCart4 className="color-one" size={34}></BsCart4>
                <span className="font-extrabold color-two text-xl">E-SHOP</span>
              </Link>
            </div>
            <div>
              <ul className="md:flex items-center hidden space-x-5">
                {/* NAVBAR ITEM LIST HERE */}
                {navItem}
              </ul>

              {/* MOBILE NAVBAR */}
              <div className="md:hidden">
                <div>
                  <span>
                    <Hamburger></Hamburger>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </ContentWrapper>
    </div>
  );
};

export default Navbar;
