import { useQuery } from "@tanstack/react-query";
import React from "react";
import ContentWrapper from "../shared/contentWrapper/ContentWrapper";
import SectionHeader from "../sectionHeader/SectionHeader";
import Loader from "../loader/Loader";

const AllProduct = () => {
  const { data: products = [], isLoading: productLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="pb-20">
      <ContentWrapper>
        <SectionHeader title={"All products"}></SectionHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10">
          {productLoading ? (
            <Loader loading={productLoading}></Loader>
          ) : (
            products.map((product) => (
              <div className="mb-10 md:mb-0" key={product._id}>
                <div className="hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] duration-300">
                  <img className="" src={product.image} alt="" />
                  <div className="p-3 md:p-5">
                    <h4 className="font-semibold text-lg">{product.name}</h4>
                    <p className="font-medium">price: ${product.price}</p>
                    <div className="flex justify-between items-center py-5">
                      <button className="font-semibold color-one">
                        Add to Cart{" "}
                      </button>
                      <button className="hover:border-2 border-2  hover:border-[#ff084e] hover:bg-transparent hover:text-[#ff084e] duration-100 transition-all py-2 px-5 bg-[#3a3a3a] text-white font-semibold rounded ">
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ContentWrapper>
    </div>
  );
};

export default AllProduct;
