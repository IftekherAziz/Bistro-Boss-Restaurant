import { Helmet } from "react-helmet-async";

const UserHome = () => {
  return (
    <div className="max-h-screen pt-0 p-10 w-full">
      <Helmet>
        <title>Bistro Boss | User Home</title>
      </Helmet>
      <h2 className="text-2xl mt-10 font-medium text-center">User Dashboard</h2>
    </div>
  );
};

export default UserHome;
