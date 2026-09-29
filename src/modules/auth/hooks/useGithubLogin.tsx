import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";
import { apiClient } from "@/shared/api/apiclient";
import useToast from "@/shared/hooks/useToast";

const callbackParams = [
  "error",
  "error_description",
  "auth_error",
  "auth",
  "oauth",
  "message",
];

export const useGithubLogin = () => {
  const { toastError, toastSuccess } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const callbackHandled = useRef(false);

  useEffect(() => {
    const errorCode =
      searchParams.get("error") ?? searchParams.get("auth_error");
    const errorDescription = searchParams.get("error_description");
    const authStatus = searchParams.get("auth") ?? searchParams.get("oauth");

    if (!errorCode && authStatus !== "success" && authStatus !== "true") {
      callbackHandled.current = false;
      return;
    }

    if (callbackHandled.current) return;
    callbackHandled.current = true;

    if (errorCode) {
      toastError(
        errorCode === "access_denied"
          ? "GitHub sign-in was cancelled."
          : errorDescription || "GitHub sign-in failed. Please try again.",
      );
    } else {
      toastSuccess(
        searchParams.get("message") || "Signed in with GitHub successfully.",
      );
    }

    const remainingParams = new URLSearchParams(searchParams);
    callbackParams.forEach((param) => remainingParams.delete(param));
    setSearchParams(remainingParams, { replace: true });
  }, [searchParams, setSearchParams, toastError, toastSuccess]);

  const handleGithubLogin = () => {
    try {
      const configuredBaseUrl = apiClient.defaults.baseURL;
      if (!configuredBaseUrl) {
        throw new Error("The authentication API URL is not configured.");
      }

      const baseUrl = configuredBaseUrl.endsWith("/")
        ? configuredBaseUrl
        : `${configuredBaseUrl}/`;
      window.location.assign(new URL("auth/github", baseUrl).toString());
    } catch (error) {
      toastError(
        error instanceof Error
          ? error.message
          : "Unable to start GitHub sign-in. Please try again.",
      );
    }
  };

  return { handleGithubLogin };
};
