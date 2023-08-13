import React, { useContext } from "react";
import SectionHeader from "../sectionHeader/SectionHeader";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const AddCustomer = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // ================> REGULAR EXPRESSION FOR NUMBER VALIDATION
  const bangladeshiMobilePattern = /^(?:\88|01)(?:\d{11})$/;

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const registeredUser = result.user;
        console.log(registeredUser);
        // ======================> UPDATE USER
        updateUser(data.name).then(() => {
          const saveUser = {
            name: data.name,
            email: data.email,
            password: data.password,
            number: data.number,
            role: "user",
          };
          fetch("https://site-server-nahid-dev.vercel.app/newUser", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(saveUser),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.insertedId) {
                reset();
                toast.success("added customer");
              }
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <SectionHeader title={"Add customer"}></SectionHeader>

      <div className="p-3 md:p-5 md:w-2/3 md:mx-auto shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] ">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* NAME */}
          <div className="flex flex-col">
            <label className="font-semibold color-two my-2">Name</label>
            <input
              className="bg-gray-200 px-3 py-2 color-two focus-visible:outline-none rounded"
              type="text"
              placeholder="Enter name "
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>
          {/* EMAIL */}
          <div className="flex flex-col">
            <label className="font-semibold color-two my-2">Email</label>
            <input
              className="bg-gray-200 px-3 py-2 color-two focus-visible:outline-none rounded"
              type="email"
              placeholder="Enter email "
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>
          {/* MOBILE NUMBER */}
          <div className="flex flex-col">
            <label className="font-semibold color-two my-2">
              Bangladeshi Mobile Number
            </label>
            <input
              className="bg-gray-200 px-3 py-2 color-two focus-visible:outline-none rounded"
              type="number"
              placeholder="Ex- 8801xxxxxxxxx "
              {...register("number", {
                required: true,
                pattern: bangladeshiMobilePattern,
              })}
            />
            {errors.number && (
              <span className="text-red-600">
                {errors.number.type === "required"
                  ? "Mobile number is required"
                  : "Invalid mobile number"}
              </span>
            )}
          </div>
          {/* PASSWORD */}
          <div className="flex flex-col">
            <label className="font-semibold color-two my-2">Password</label>
            <input
              className="bg-gray-200 px-3 py-2 color-two focus-visible:outline-none rounded"
              type="password"
              placeholder="Enter password "
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-600">password is required</span>
            )}
          </div>
          {/* SUBMIT */}
          <div className="my-7">
            <button
              type="submit"
              className="w-full py-3 text-white bg-[#ff084e] rounded"
            >
              Add Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;
