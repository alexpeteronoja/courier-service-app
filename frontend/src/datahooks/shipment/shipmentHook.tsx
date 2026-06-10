import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ApiInstance from "../../api/ApiInstance";
import type {
  addTrackingEventPayload,
  createShipmentErrorResponse,
  createShipmentPayload,
  UpdateShipmentPayload,
} from "./shipmenttype";
import type { AxiosError } from "axios";

export const useGetAllShipment = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getAllShipment"],
    queryFn: async () => {
      try {
        const response = await ApiInstance.get("/shipment");
        return response?.data || [];
      } catch (err) {
        console.error(err);
      }
    },
  });

  return {
    getAllShipment: data?.data?.shipment,
    getAllShipmentLoading: isLoading,
    getAllShipmentError: isError,
  };
};

// Create Shipment

export const useCreateShipment = () => {
  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation<
    unknown,
    AxiosError<createShipmentErrorResponse>,
    createShipmentPayload
  >({
    mutationFn: (data) => ApiInstance.post("/shipment", data),
    onError: (err) => {
      console.error("Error", err?.response?.data?.data?.message);
    },
  });
  return {
    createShipmentMutate: mutate,
    createShipmentMutateAsync: mutateAsync,
    createShipmentPending: isPending,
    createShipmentError: isError,
    createShipmentsSuccess: isSuccess,
  };
};

// Get A Single Shipment

export const useGetShipment = (shipmentId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["getShipment", shipmentId],
    queryFn: async () => {
      try {
        const response = await ApiInstance.get(`/shipment/${shipmentId}`);
        return response?.data || [];
      } catch (err) {
        console.error(err);
      }
    },
    enabled: !!shipmentId,
  });

  return {
    getShipment: data?.data?.shipment,
    getShipmentLoading: isLoading,
    getShipmentError: isError,
  };
};

// Public Tracking

export const usePublicTracking = (trackingCode: string) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["publicTracking", trackingCode],
    queryFn: async () => {
      try {
        const response = await ApiInstance.get(
          `/shipment/track/${trackingCode}`,
        );
        return response?.data || [];
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    enabled: !!trackingCode,
    retry: 2,
  });

  return {
    publicTracking: data?.data?.shipment,
    publicTrackingLoading: isLoading,
    publicTrackingError: isError,
    publicTrackingErrorMessage: error,
  };
};

// Update Shipment

export const useUpdateShipment = () => {
  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation<
    unknown,
    AxiosError<createShipmentErrorResponse>,
    UpdateShipmentPayload
  >({
    mutationFn: ({ shipmentId, data }) =>
      ApiInstance.patch(`/shipment/${shipmentId}`, data),

    onError: (err) => {
      console.error("Error", err?.response?.data?.data?.message);
    },
  });
  return {
    updateShipmentMutate: mutate,
    updateShipmentMutateAsync: mutateAsync,
    updateShipmentPending: isPending,
    updateShipmentError: isError,
    updateShipmentSuccess: isSuccess,
  };
};

// Delete Shipment

export const useDeleteShipment = () => {
  const queryClient = useQueryClient();
  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation<
    unknown,
    AxiosError<createShipmentErrorResponse>,
    string
  >({
    mutationFn: (shipmentId) => ApiInstance.delete(`/shipment/${shipmentId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllShipment"] });
    },
    onError: (err) => {
      console.error("Error", err?.response?.data?.data?.message);
    },
  });
  return {
    deleteShipmentMutate: mutate,
    deleteShipmentMutateAsync: mutateAsync,
    deleteShipmentPending: isPending,
    deleteShipmentError: isError,
    deleteShipmentsSuccess: isSuccess,
  };
};

// Add Tracking Event

export const useAddTrackingEvent = () => {
  const { mutate, mutateAsync, isPending, isError, isSuccess } = useMutation<
    unknown,
    AxiosError<createShipmentErrorResponse>,
    addTrackingEventPayload
  >({
    mutationFn: ({ shipmentId, data }) =>
      ApiInstance.patch(`/shipment/${shipmentId}/events`, data),

    onError: (err) => {
      console.error("Error", err?.response?.data?.data?.message);
    },
  });
  return {
    addTrackingEventMutate: mutate,
    addTrackingEventMutateAsync: mutateAsync,
    addTrackingEventPending: isPending,
    addTrackingEventError: isError,
    addTrackingEventSuccess: isSuccess,
  };
};
