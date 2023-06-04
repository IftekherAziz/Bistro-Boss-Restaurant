import { Helmet } from "react-helmet-async";


const Reservations = () => {
    return (
      <div className="max-h-screen pt-0 p-10 w-full">
        <Helmet>
          <title>Bistro Boss | Reservartion</title>
        </Helmet>
        <h2 className="text-2xl mt-10 font-medium text-center">Reservations Data</h2>
      </div>
    );
};

export default Reservations;