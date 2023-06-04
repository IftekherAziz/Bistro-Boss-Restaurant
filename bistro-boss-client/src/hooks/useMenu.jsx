import { useQuery } from "@tanstack/react-query";

const useMenu = () => {
  const {
    data: menu = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["menu"],
    queryFn: async () => {
      const res = await fetch("https://bistro-boss-restaurant-beta.vercel.app/menu");
      const data = await res.json();
      return data;
    },
  });
  return [menu, loading, refetch];
};

export default useMenu;
