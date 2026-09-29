import { apiClient } from "@/shared/api/apiclient";
import type {
  LoginPayload,
  LoginResponse,
  SignupPayload,
  SignupResponse,
} from "../types/auth.types";

export const login = async (payload: LoginPayload) => {
  const { data } = await apiClient.post<LoginResponse>("/auth/login", payload);
  return data;
};

export const signup = async (payload: SignupPayload) => {
  const { data } = await apiClient.post<SignupResponse>("/auth/signup", payload);
  return data;
};