import { useUser } from "@/modules/main/settings/store/useUser";
import { apiClient, queryClient } from "@/shared/api/apiclient";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useLogout = () => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const { mutate: logoutMutate, isPending: logoutLoading } = useMutation({
    mutationFn: async () => {
      try {
        const res = await apiClient.post(`/auth/logout`);
        return res.data;
      } catch (err) {
        throw err;
      }
    },

    onSuccess: () => {
      logout();
      navigate("/");
      queryClient.clear();
    },

    onError: (err) => {
      console.error(err);
    },
  });
  return {
    logoutMutate,
    logoutLoading,
  };
};
