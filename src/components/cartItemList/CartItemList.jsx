import React from "react";
import { toast } from "react-hot-toast";

const CartItemList = ({ item, index, refetch }) => {
  //   console.log(item);
  const handleCheckOut = (item) => {
    const checkoutData = {
      image: item.image,
      price: item.price,
      rating: item.rating,
      email: item.email,
      name: item.name,
      id: item._id,
    };
    fetch("http://localhost:5000/checkout", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(checkoutData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        refetch();
        toast.success("checkout done");
      });
  };

  // ===============> HANDLE DELETE ITEM
  const handleDeleteClass = (id) => {
    fetch(`http://localhost:5000/deleteItem/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        refetch();
        if (data.deletedCount > 0) {
          toast.success("Product deleted");
        }
      });
  };
  return (
    <>
      <tr>
        <th>{index + 1}</th>
        <td>
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={item.image} alt="Product Image" />
            </div>
          </div>
        </td>
        <td>{item.name}</td>
        <td className="text-center">{item.price}</td>
        <th>
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            {item?.status === "checkout" ? (
              <button
                className="text-white px-2 py-1 bg-[#928a8a] rounded"
                disabled
              >
                Checked
              </button>
            ) : (
              <button
                onClick={() => handleCheckOut(item)}
                className="text-white px-2 py-1 bg-[#3a3a3a] rounded"
              >
                Checkout
              </button>
            )}
            {item?.status === "checkout" || (
              <button
                onClick={() => handleDeleteClass(item._id)}
                className="btn btn-sm btn-circle btn-outline"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </th>
      </tr>
    </>
  );
};

export default CartItemList;
