import React, { useContext } from "react";
import image from "../../assets/man_on_desk.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Provider/AuthProvider";

const Login = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  // SUBMIT FROM HERE
  const onSubmit = (data) => {
    const phoneNumber = {
      number: data.number,
    };
    // console.log(phoneNumber);
    fetch("http://localhost:5000/verifyNumber", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(phoneNumber),
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          // console.log("Number match");
          signInUser(data.email, data.password)
            .then((result) => {
              const loginUser = result.user;
              console.log(loginUser);
              toast.success("login successfully");
              reset();
              navigate("/");
            })
            .catch((err) => {
              console.log(err.message);
              toast.error("password not match");
            });
        } else {
          toast.error("number not match");
        }
      })
      .catch((error) => {
        console.log(error.message);
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
              Login
            </h5>
            <form onSubmit={handleSubmit(onSubmit)}>
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
              {/* MOBILE NUMBER */}
              <div className="flex flex-col">
                <label className="font-semibold color-two my-2">
                  Your Phone Number
                </label>
                <input
                  className="bg-gray-200 px-3 py-2 color-two focus-visible:outline-none rounded"
                  type="number"
                  placeholder="Ex- 8801xxxxxxxxx "
                  {...register("number", { required: true })}
                />
                {errors.number && (
                  <span className="text-red-600">Number is required</span>
                )}
              </div>
              {/* SUBMIT */}
              <div className="my-7">
                <button
                  type="submit"
                  className="w-full py-3 text-white bg-[#ff084e] rounded"
                >
                  Login
                </button>
              </div>
              <div>
                <p>
                  Are you new here?{" "}
                  <Link className="color-one font-medium" to="/registration">
                    Register
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

export default Login;
