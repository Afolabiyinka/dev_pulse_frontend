import { apiClient } from "@/shared/api/apiclient";
import { useQuery } from "@tanstack/react-query";
import type { UserResponse } from "../types/user.types";

export const useFetchUser = () => {
  const { data, isLoading, isFetched, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await apiClient.get<UserResponse>("/account/me");
      return data;
    },
  });

  return {
    fetchedUser: data,
    loading: isLoading,
    isFetched,
    refetch,
    error,
  };
};
