import { useQuery } from "@tanstack/react-query";
import ApiInstance from "../../api/ApiInstance";

export const useGetOverview = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      try {
        const response = await ApiInstance.get("/dashboard/overview");
        return response?.data || [];
      } catch (err) {
        console.error(err);
      }
    },
  });

  return {
    getOverview: data?.data?.overview,
    getOverviewLoading: isLoading,
    getOverviewError: isError,
  };
};
