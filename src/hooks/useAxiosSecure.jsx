import axios from "axios";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";

// =========== > BASE URL
const axiosSecure = axios.create({
  baseURL: "https://site-server-nahid-dev.vercel.app",
});

const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
      }
    );
  }, [logOut, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
