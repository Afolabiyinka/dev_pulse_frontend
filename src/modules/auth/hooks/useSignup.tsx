import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { apiClient, ApiClientError } from "@/shared/api/apiclient";
import useToast from "@/shared/hooks/useToast";
import type { LoginResponse, SignupPayload } from "../types/auth.types";

export const useSignup = () => {
  const [signupData, setSignupData] = useState<SignupPayload>({
    username: "",
    email: "",
    password: "",
    confirmedPassword: "",
  });
  const { toastError, toastSuccess } = useToast();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationKey: ["auth", "signup"],
    mutationFn: async (payload: SignupPayload) => {
      const { data } = await apiClient.post<LoginResponse>(
        "/auth/signup",
        payload,
      );
      return data;
    },
    onSuccess: (data) => {
      toastSuccess(data.message ?? "Account created. You can now sign in.");
      navigate("/dashboard");
    },
    onError: (err) => {
      toastError(
        err instanceof ApiClientError
          ? err.message
          : "Unable to create your account. Please try again.",
      );
    },
  });

  const handleSignup = () => {
    if (signupData.password !== signupData.confirmedPassword) {
      toastError("Passwords do not match.");
      return;
    }

    mutation.mutate(signupData);
  };

  return {
    handleSignup,
    signupAsync: () => mutation.mutateAsync(signupData),
    loading: mutation.isPending,
    error: mutation.error,
    signupData,
    setSignupData,
  };
};
