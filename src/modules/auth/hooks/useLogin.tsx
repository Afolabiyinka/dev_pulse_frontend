import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import type { LoginPayload } from "../types/auth.types";
import { login } from "../services/auth.request";
import { ApiClientError, queryClient } from "@/shared/api/apiclient";
import useToast from "@/shared/hooks/useToast";

export const useLogin = () => {
  const [loginData, setLoginData] = useState<LoginPayload>({
    email: "",
    password: "",
  });
  const { toastError, toastSuccess } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["auth", "login"],
    mutationFn: (payload: LoginPayload) => login(payload),
    onSuccess: async (data) => {
      toastSuccess(data.message);
      navigate(`/dashboard`);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (err) => {
      toastError(
        err instanceof ApiClientError
          ? err.message
          : "Unable to sign in. Please try again.",
      );
    },
  });

  const handleLogin = () => mutation.mutate(loginData);

  return {
    handleLogin,
    loginAsync: () => mutation.mutateAsync(loginData),
    loading: mutation.isPending,
    error: mutation.error,
    loginData,
    setLoginData,
  };
};
