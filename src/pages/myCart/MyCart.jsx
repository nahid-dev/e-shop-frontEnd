import React from "react";
import SectionHeader from "../../components/sectionHeader/SectionHeader";
import ContentWrapper from "../../components/shared/contentWrapper/ContentWrapper";
import useCart from "../../hooks/useCart";
import CartItemList from "../../components/cartItemList/CartItemList";
import Loader from "../../components/loader/Loader";

const MyCart = () => {
  const [cart, refetch, cartLoading] = useCart();
  return (
    <div className="min-h-[100vh] md:pt-[75px]">
      <ContentWrapper>
        <SectionHeader title={"My Cart"}></SectionHeader>
        {/* LIST ITEM WITH TABLE */}
        <div className="overflow-x-auto">
          <table className="lg:table md:table-md table-zebra table-sm">
            {/* head */}
            <thead className="bg-pink-100">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th className="text-center">Price</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartLoading ? (
                <Loader loading={cartLoading}></Loader>
              ) : (
                cart &&
                cart?.map((item, index) => (
                  <CartItemList
                    key={index}
                    item={item}
                    index={index}
                    refetch={refetch}
                  ></CartItemList>
                ))
              )}
            </tbody>
          </table>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default MyCart;
