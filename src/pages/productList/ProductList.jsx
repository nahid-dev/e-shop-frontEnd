import React from "react";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../components/loader/Loader";
import { Link } from "react-router-dom";
import { BsFillPlusCircleFill } from "react-icons/bs";

const ProductList = () => {
  const { data: products = [], isLoading: productLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      return data;
    },
  });

  console.log(products);
  return (
    <div>
      <SectionHeader title={"Product list"}></SectionHeader>

      {/* ADD PRODUCT */}
      <div className="font-medium md:px-10 my-3 md:my-5 inline-block">
        <Link
          to="/dashboard/addCustomer"
          className="flex gap-2 items-center border-2 p-1 rounded border-[#3a3a3a]"
        >
          <span>ADD PRODUCT</span>{" "}
          <span className="color-two">
            <BsFillPlusCircleFill size={28}></BsFillPlusCircleFill>
          </span>
        </Link>
      </div>

      {/*========================== TABLE OF PRODUCTS */}
      {productLoading ? (
        <Loader loading={productLoading}></Loader>
      ) : (
        <div className="overflow-x-auto md:px-10">
          <table className="lg:table table-sm table-zebra">
            {/* head */}
            <thead className="bg-pink-100 ">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th className="text-center">Rating</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product, index) => (
                <tr key={product._id}>
                  <th>{index + 1}</th>
                  <td>{product.name}</td>
                  <td>$ {product.price}</td>
                  <td className="text-center">{product.rating}</td>
                  <td className="text-center">
                    <Link
                      className="bg-[#3a3a3a] text-white px-1 text-sm md:text-base md:px-2 md:py-1 rounded"
                      to={`/dashboard/productDetails/${product._id}`}
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

export default ProductList;
