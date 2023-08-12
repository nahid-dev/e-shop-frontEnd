import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    refetch,
    data: cart = [],
    isLoading: cartLoading,
  } = useQuery({
    queryKey: ["myCart", user?.email],
    enabled: !loading,

    queryFn: async () => {
      const res = await axiosSecure(`/myCart/${user?.email}`);
      return res.data;
    },
  });
  return [cart, refetch, cartLoading];
};

export default useCart;
