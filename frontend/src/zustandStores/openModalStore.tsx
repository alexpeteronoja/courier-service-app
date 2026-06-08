import { create } from "zustand";

import type { TrackingTypes } from "../components/tracking/TrackingTypes";
import type { ShipmentFormDataTypes } from "../components/shipment/shipmentTypes";

// export const useTransferStore = create((set) => ({
//   isTransferOpen: false,
//   setOpenTransfer: (value) =>
//     set({
//       isTransferOpen: value,
//     }),

// }));

// Add Shipment Store

type openShipmentStores = {
  isAddShipmentOpen: boolean;
  openAddShipment: () => void;
  closeAddShipment: () => void;
};

export const useOpenAddShipmentStores = create<openShipmentStores>((set) => ({
  isAddShipmentOpen: false,
  openAddShipment: () =>
    set({
      isAddShipmentOpen: true,
    }),
  closeAddShipment: () =>
    set({
      isAddShipmentOpen: false,
    }),
}));

// Tracking Store

type TrackingStore = {
  isAddTrackingOpen: boolean;
  trackingDataStore: TrackingTypes | null;

  openAddTracking: () => void;
  closeAddTracking: () => void;

  setTrackingDataStore: (value: TrackingTypes) => void;
};

export const useTrackingStores = create<TrackingStore>((set) => ({
  isAddTrackingOpen: false,
  trackingDataStore: null,

  openAddTracking: () =>
    set({
      isAddTrackingOpen: true,
    }),

  setTrackingDataStore: (value) =>
    set({
      trackingDataStore: value,
    }),

  closeAddTracking: () =>
    set({
      isAddTrackingOpen: false,
      trackingDataStore: null,
    }),
}));

// Edit Shipment Store

type shipmentStoreProps = ShipmentFormDataTypes;

type EditShipmentStoreState = {
  editShipmentStore: shipmentStoreProps | null;
  setEditShipmentStore: (value: shipmentStoreProps) => void;
  closeEditShipmentStore: () => void;
};

export const useEditShipmentStore = create<EditShipmentStoreState>((set) => ({
  editShipmentStore: null,

  setEditShipmentStore: (value) =>
    set({
      editShipmentStore: value,
    }),

  closeEditShipmentStore: () =>
    set({
      editShipmentStore: null,
    }),
}));

// Open Create Staff Stores

type openCreateStaffStoreProps = {
  isCreateStaffStoreOpen: boolean;
  openCreateStaffStore: () => void;
  closeCreateStaffStore: () => void;
};

export const useOpenCreateStaffStore = create<openCreateStaffStoreProps>(
  (set) => ({
    isCreateStaffStoreOpen: false,
    openCreateStaffStore: () =>
      set({
        isCreateStaffStoreOpen: true,
      }),
    closeCreateStaffStore: () =>
      set({
        isCreateStaffStoreOpen: false,
      }),
  }),
);
