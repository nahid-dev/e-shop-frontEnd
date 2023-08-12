import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import Details from "../../components/details/Details";

const DetailsView = () => {
  const { id } = useParams();
  //   console.log(id);
  const { data: productDetails = {}, isLoading: detailsLoading } = useQuery({
    queryKey: ["productDetails"],
    queryFn: async () => {
      const res = await fetch(`http://localhost:5000/singleProduct/${id}`);
      const data = await res.json();
      return data;
    },
  });
  return (
    <div className="mt-[100px]">
      <SectionHeader title={"Product Details"}></SectionHeader>
      <div>
        <Details product={productDetails} loading={detailsLoading}></Details>
      </div>
    </div>
  );
};

export default DetailsView;
