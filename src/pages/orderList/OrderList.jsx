import React from "react";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/Loader";

const OrderList = () => {
  // =================> TOTAL ORDER
  const { data: totalOrder = [], isLoading: orderLoading } = useQuery({
    queryKey: ["totalOrder"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/totalOrder");
      const data = await res.json();
      return data;
    },
  });
  return (
    <div>
      <SectionHeader title={"Order list"}></SectionHeader>

      {/*========================== TABLE OF Orders */}
      {orderLoading ? (
        <Loader loading={orderLoading}></Loader>
      ) : (
        <div className="overflow-x-auto md:px-10">
          <table className="lg:table table-sm table-zebra">
            {/* head */}
            <thead className="bg-pink-100 ">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th className="text-center">Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {totalOrder?.map((order, index) => (
                <tr key={order._id}>
                  <th>{index + 1}</th>
                  <td>{order.name}</td>
                  <td>{order.email}</td>
                  <td className="text-center">$ {order.price}</td>
                  <td className="text-center">
                    <Link
                      className="bg-[#3a3a3a] text-white px-1 text-sm md:text-base md:px-2 md:py-1 rounded"
                      to={`/dashboard/orderDetails/${order._id}`}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderList;
