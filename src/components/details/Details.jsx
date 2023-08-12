import React from "react";
import Loader from "../loader/Loader";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

const Details = ({ product, loading }) => {
  const { image, rating, price, desc, name } = product;
  return (
    <>
      {loading ? (
        <Loader loading={loading}></Loader>
      ) : (
        <div className="w-full md:w-3/4 mx-auto md:p-10  flex justify-center items-center ">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 px-5 md:px-0 md:p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-5 md:mx-0 py-5">
            <div className=" flex justify-center">
              <div className="md:w-[300px] ">
                <img className="" src={image} alt="" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="space-y-8">
                <h4 className="text-2xl font-bold">{name}</h4>
                <span className="mt-5 block">
                  <Rating
                    value={rating}
                    readOnly
                    style={{ maxWidth: 100 }}
                  ></Rating>
                </span>
                <p className="text-xl font-bold"> ${price}</p>
                <p className="color-two">{desc}</p>
                <button className="bg-[#ff084e] px-2 py-1 text-white md:px-4 md:py-2">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
