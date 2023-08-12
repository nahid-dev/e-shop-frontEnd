import React, { useContext } from "react";
import image from "../../assets/man_on_desk.png";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const Registration = () => {
  const { createUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // ================> REGULAR EXPRESSION FOR NUMBER VALIDATION
  const bangladeshiMobilePattern = /^(?:\+?88|01)(?:\d{11})$/;

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
            number: data.number,
            role: "user",
          };
          fetch("http://localhost:5000/newUser", {
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
                navigate("/login");
                toast.success("register successfully");
              }
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="pt-[100px]">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
        <div className="hidden md:flex items-center  ">
          <div>
            <img className="w-1/2 mx-auto" src={image} alt="" />
          </div>
        </div>
        <div className=" md:p-10">
          <div className="shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] md:w-3/4 mx-5 md:mx-auto p-5 md:p-10">
            <h5 className="font-semibold text-2xl mb-6 md:mb-10 text-center">
              Registration
            </h5>
            {/* FORM START HERE */}
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
                  placeholder="Ex- 01xxxxxxxxx "
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
                  Register
                </button>
              </div>
              <div>
                <p>
                  Already have an account?{" "}
                  <Link className="color-one font-medium" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
