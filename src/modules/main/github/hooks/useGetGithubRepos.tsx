import { useQuery } from "@tanstack/react-query";
import type { GitHubRepositoriesResponse } from "../github.types";
import { apiClient } from "@/shared/api/apiclient";

export const useGetGithubRepos = (page: number = 1, perPage: number = 10) => {
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["github-repos", page, perPage],
    queryFn: async (): Promise<GitHubRepositoriesResponse> => {
      const { data } = await apiClient.get<GitHubRepositoriesResponse>(
        "/github/repos",
        {
          params: {
            page,
            per_page: perPage,
          },
        },
      );

      return data;
    },
    placeholderData: (previousData) => previousData,
  });

  return {
    data,
    loading: isLoading,
    isFetching,
    error,
    refetch,
  };
};
