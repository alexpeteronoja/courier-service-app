// utils/toast.ts
import { toast } from "react-toastify";

export const notifySuccess = (message: string) =>
  toast.success(message, {
    toastId: message,
  });

export const notifyError = (message: string) =>
  toast.error(message, {
    toastId: message,
  });
