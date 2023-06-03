import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useAxiosSecure } from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const { user } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/admin/stats");
      return res.data;
    },
  });

  return (
    <div className="w-full m-4">
      <Helmet>
        <title>Bistro Boss | Admin Home</title>
      </Helmet>
      <h2 className="text-2xl font-medium text-center">
        Hi, {user.displayName}. Welcome Back
      </h2>
    </div>
  );
};

export default AdminHome;
