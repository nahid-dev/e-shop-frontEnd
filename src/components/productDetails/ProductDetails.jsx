import React from "react";
import SectionHeader from "../sectionHeader/SectionHeader";
import Details from "../details/Details";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const ProductDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { data: productDetails = {}, isLoading: detailsLoading } = useQuery({
    queryKey: ["productDetails"],
    queryFn: async () => {
      const res = await fetch(
        `https://site-server-nahid-dev.vercel.app/singleProduct/${id}`
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(productDetails);
  return (
    <div>
      <SectionHeader title={"Product Details"}></SectionHeader>
      <div>
        <Details product={productDetails} loading={detailsLoading}></Details>
      </div>
    </div>
  );
};

export default ProductDetails;
