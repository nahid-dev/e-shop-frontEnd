import React from "react";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";

const CustomerList = () => {
  // =================> TOTAL CUSTOMER
  const { data: totalCustomer = [], isLoading: customerLoading } = useQuery({
    queryKey: ["totalCustomer"],
    queryFn: async () => {
      const res = await fetch(
        "https://site-server-nahid-dev.vercel.app/totalCustomer"
      );
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="">
      <SectionHeader title={"customer list"}></SectionHeader>

      {/* ADD CUSTOMER */}
      <div className="font-medium md:px-10 my-3 md:my-5 inline-block">
        <Link
          to="/dashboard/addCustomer"
          className="flex gap-2 items-center border-2 p-1 rounded border-[#3a3a3a]"
        >
          <span>ADD CUSTOMER</span>{" "}
          <span className="color-two">
            <BsFillPlusCircleFill size={28}></BsFillPlusCircleFill>
          </span>
        </Link>
      </div>

      {/*========================== TABLE OF Customers */}
      {customerLoading ? (
        <Loader loading={customerLoading}></Loader>
      ) : (
        <div className="overflow-x-auto md:px-10">
          <table className="lg:table table-sm table-zebra">
            {/* head */}
            <thead className="bg-pink-100 ">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th className="text-center">Phone Number</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {totalCustomer?.map((person, index) => (
                <tr key={person._id}>
                  <th>{index + 1}</th>
                  <td>{person.name}</td>
                  <td>{person.email}</td>
                  <td className="text-center">{person.number}</td>
                  <td className="text-center">
                    <Link
                      className="bg-[#3a3a3a] text-white px-1 text-sm md:text-base md:px-2 md:py-1 rounded"
                      to={`/dashboard/customerDetails/${person._id}`}
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

export default CustomerList;
