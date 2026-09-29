import axios, { type AxiosError } from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 5 * 60 * 1000,
         refetchOnWindowFocus: false,
         refetchOnReconnect: false,
         networkMode: "online",
         retry: 1,
      },
      mutations: {
         networkMode: "online",
         retry: false,
      },
   },
});

const testingEndpoint = "http://localhost:8000/api";
const prodEndpoint = "https://job-trackrr.onrender.com/api";
export { testingEndpoint, prodEndpoint };

export class ApiClientError extends Error {
   status?: number;
   code?: string;
   details?: unknown;

   constructor(
      message: string,
      options: { status?: number; code?: string; details?: unknown } = {},
   ) {
      super(message);
      this.name = "ApiClientError";
      this.status = options.status;
      this.code = options.code;
      this.details = options.details;
   }
}

const getErrorMessage = (error: AxiosError<unknown>) => {
   const data = error.response?.data;
   if (data && typeof data === "object") {
      const payload = data as Record<string, unknown>;
      if (typeof payload.message === "string") return payload.message;
      if (typeof payload.detail === "string") return payload.detail;
      if (typeof payload.error === "string") return payload.error;
   }

   if (error.response) return `Request failed with status ${error.response.status}.`;
   if (error.code === "ECONNABORTED") return "The request timed out. Please try again.";
   return "Unable to connect. Check your connection and try again.";
};

const baseURL =
   import.meta.env.VITE_API_BASE_URL ||
   (import.meta.env.DEV ? testingEndpoint : prodEndpoint);

export const apiClient = axios.create({
   baseURL,
   timeout: 15_000,
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   },
   withCredentials: true,
});

apiClient.interceptors.response.use(
   (response) => response,
   (error: unknown) => {
      if (axios.isAxiosError(error)) {
         return Promise.reject(
            new ApiClientError(getErrorMessage(error), {
               status: error.response?.status,
               code: error.code,
               details: error.response?.data,
            }),
         );
      }

      return Promise.reject(
         new ApiClientError(
            error instanceof Error ? error.message : "An unexpected error occurred.",
         ),
      );
   },
);