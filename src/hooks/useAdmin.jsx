import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: isAdmin, isLoading: adminLoading } = useQuery({
    queryKey: ["isAdmin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `https://site-server-nahid-dev.vercel.app/admin/${user?.email}`
      );
      return res.data.admin;
    },
  });
  return [isAdmin, adminLoading];
};

export default useAdmin;
