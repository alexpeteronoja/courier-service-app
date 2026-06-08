import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiInstance from "../../api/ApiInstance";
import type { AxiosError } from "axios";
import type { createShipmentErrorResponse } from "../shipment/shipmenttype";
import type { deactivateUserPayload } from "./userhooktype";

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
