import React, { useContext, useState } from "react";
import ContentWrapper from "../../components/shared/contentWrapper/ContentWrapper";
import { Link, NavLink } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import Hamburger from "hamburger-react";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import useAdmin from "../../hooks/useAdmin";
import useCart from "../../hooks/useCart";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  // console.log(cart);

  // =============> LOG OUT FUNCTION
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("log out");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

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
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? "active" : "default")}
          to="/myCart"
        >
          <div className="indicator">
            <span className="indicator-item badge text-white bg-[#3a3a3a]">
              +{cart?.length}
            </span>
            <button className="py-1">Cart</button>
          </div>
        </NavLink>
      </li>
      {isAdmin && (
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? "active" : "default")}
            to="/dashboard/overview"
          >
            Dashboard
          </NavLink>
        </li>
      )}
      {user ? (
        <li className="font-semibold md:text-lg bg-[#ff084e] text-white rounded px-2">
          <Link onClick={handleLogOut} to="">
            Logout
          </Link>
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
    <div className="shadow py-3 fixed top-0 z-50 bg-white w-full">
      <ContentWrapper>
        {/* NAVBAR START */}
        <nav className="">
          <div className="flex items-center justify-between">
            <div>
              <Link
                to="/"
                className="flex items-center border-2 border-[#3a3a3a] p-1 rounded"
              >
                <BsCart4 className="color-one" size={34}></BsCart4>
                <span className="font-extrabold color-two text-xl">E-SHOP</span>
              </Link>
            </div>
            <div>
              <ul className="md:flex items-center hidden space-x-10">
                {/* NAVBAR ITEM LIST HERE */}
                {navItem}
              </ul>

              {/* MOBILE NAVBAR */}
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
                    {navItem}
                  </ul>
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
