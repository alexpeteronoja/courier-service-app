import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiInstance from "../../api/ApiInstance";
import type { AxiosError } from "axios";
import type { createShipmentErrorResponse } from "../shipment/shipmenttype";
import type { deactivateUserPayload, updateMePayload } from "./userhooktype";

// Get All Users

export const useGetAllUser = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllUser"],
    queryFn: async () => {
      try {
        const response = await ApiInstance.get("/user");
        return response?.data || [];
      } catch (err) {
        console.error(err);
      }
    },
  });

  return {
    getAllUser: data?.data?.user,
    getAllUserLoading: isLoading,
    getAllUserError: isError,
  };
};

// Get Me (User Self)

export const useGetMe = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getMe"],
    queryFn: async () => {
      try {
        const response = await ApiInstance.get("/user/me");
        return response?.data || [];
      } catch (err) {
        console.error(err);
      }
    },
  });

  return {
    getMe: data?.data?.user,
    getMeLoading: isLoading,
    getMeError: isError,
  };
};

// Edit Me (User Self)

export const useUpdateMe = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation<
    unknown,
    AxiosError<createShipmentErrorResponse>,
    updateMePayload
  >({
    mutationFn: (data) => ApiInstance.patch("/user/me", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMe"] });
    },
    onError: (err) => {
      console.error("Error", err?.response?.data?.data?.message);
    },
  });
  return {
    updateMeMutate: mutate,
    updateMeMutateAsync: mutateAsync,
    updateMePending: isPending,
    updateMeError: isError,
    updateMeSuccess: isSuccess,
  };
};

// Deactivate User

export const useDeactivateUser = () => {
  const queryClient = useQueryClient();

  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation<
    unknown,
    AxiosError<createShipmentErrorResponse>,
    deactivateUserPayload
  >({
    mutationFn: ({ userId, data }) =>
      ApiInstance.patch(`/user/${userId}/toggle-status`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUser"] });
    },
    onError: (err) => {
      console.error("Error", err?.response?.data?.data?.message);
    },
  });
  return {
    deactivateUserMutate: mutate,
    deactivateUserMutateAsync: mutateAsync,
    deactivateUserPending: isPending,
    deactivateUserError: isError,
    deactivateUserSuccess: isSuccess,
  };
};

// Delete User

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation<
    unknown,
    AxiosError<createShipmentErrorResponse>,
    string
  >({
    mutationFn: (userId) => ApiInstance.delete(`/user/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllUser"] });
    },
    onError: (err) => {
      console.error("Error", err?.response?.data?.data?.message);
    },
  });
  return {
    deleteUserMutate: mutate,
    deleteUserMutateAsync: mutateAsync,
    deleteUserPending: isPending,
    deleteUserError: isError,
    deleteUserSuccess: isSuccess,
  };
};
