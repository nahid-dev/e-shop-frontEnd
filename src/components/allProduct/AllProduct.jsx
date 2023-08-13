import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import ContentWrapper from "../shared/contentWrapper/ContentWrapper";
import SectionHeader from "../sectionHeader/SectionHeader";
import Loader from "../loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-hot-toast";
import useCart from "../../hooks/useCart";

const AllProduct = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [, refetch] = useCart();

  const { data: products = [], isLoading: productLoading } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/products");
      const data = await res.json();
      return data;
    },
  });

  // ADD TO CART PRODUCT FUNCTION
  const handleAddToCart = (product) => {
    // console.log(addCart);
    if (user) {
      const addCart = {
        productId: product._id,
        name: product.name,
        image: product.image,
        desc: product.desc,
        price: product.price,
        rating: product.rating,
        email: user.email,
      };
      fetch("http://localhost:5000/addCart", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(addCart),
      })
        .then((res) => res.json())
        .then(() => {
          toast.success("added to cart");
          refetch();
        })
        .catch(() => {
          toast.error("already added");
        });
    } else {
      toast.error("login first");
      navigate("/login");
    }
  };
  return (
    <div id="allProduct" className="pb-20">
      <ContentWrapper>
        <SectionHeader title={"All products"}></SectionHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-10">
          {productLoading ? (
            <Loader loading={productLoading}></Loader>
          ) : (
            products.map((product) => (
              <div className="mb-10 md:mb-0" key={product._id}>
                <div className="hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] duration-300">
                  <img className="w-full" src={product.image} alt="" />
                  <div className="p-3 md:p-5">
                    <h4 className="font-semibold text-lg">{product.name}</h4>
                    <p className="font-medium">price: ${product.price}</p>
                    <div className="flex justify-between items-center py-5">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="font-semibold color-one hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] py-2 px-5"
                      >
                        Add to Cart{" "}
                      </button>
                      <Link
                        to={`/detailsView/${product._id}`}
                        className="hover:border-2 border-2  hover:border-[#ff084e] hover:bg-transparent hover:text-[#ff084e] duration-100 transition-all py-2 px-5 bg-[#3a3a3a] text-white font-semibold rounded "
                      >
                        Details
                      </Link>
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
