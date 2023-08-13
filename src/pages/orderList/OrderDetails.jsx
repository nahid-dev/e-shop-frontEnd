import React from "react";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/Loader";
import { Rating } from "@smastrom/react-rating";

const OrderDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { data: orderDetails = {}, isLoading: orderLoading } = useQuery({
    queryKey: ["OrderDetails"],
    queryFn: async () => {
      const res = await fetch(
        `https://site-server-nahid-dev.vercel.app/orderDetails/${id}`
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(orderDetails);
  return (
    <div>
      <SectionHeader title={"Order details"}></SectionHeader>

      <div>
        {orderLoading ? (
          <Loader loading={orderLoading}></Loader>
        ) : (
          <div
            key={orderDetails._id}
            className="w-full md:w-3/4 mx-auto md:p-10  flex justify-center items-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 px-5 md:px-5 md:p-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mx-5 md:mx-0 py-5">
              <div className=" flex justify-center">
                <div className="md:w-[300px] ">
                  <img className="" src={orderDetails.image} alt="" />
                </div>
              </div>
              <div className="flex items-center">
                <div className="space-y-8">
                  <h4 className="text-2xl font-bold">{orderDetails.name}</h4>
                  <span className="mt-5 block">
                    <Rating
                      value={orderDetails.rating}
                      readOnly
                      style={{ maxWidth: 100 }}
                    ></Rating>
                  </span>
                  <p className="text-xl font-bold"> ${orderDetails.price}</p>
                  <p className="color-two font-medium">
                    Order person: {orderDetails.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
