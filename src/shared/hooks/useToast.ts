import { toast as sonnerToast } from "sonner";

const useToast = () => ({
  toastMessage: sonnerToast,
  toastSuccess: sonnerToast.success,
  toastInfo: sonnerToast.info,
  toastWarning: sonnerToast.warning,
  toastError: sonnerToast.error,
  toastLoading: sonnerToast.loading,
  toastDismiss: sonnerToast.dismiss,
});

export default useToast;