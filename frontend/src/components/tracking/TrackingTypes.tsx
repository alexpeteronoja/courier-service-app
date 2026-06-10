export type AddTrackingFormData = {
  _id: string;
  status: string;

  location: string;

  description: string;
  category: string;
};

// Tracking Table.

export interface TrackingTypes {
  _id: string;
  trackingCode: string;
  recipientName: string;
  recipientAddress: string;
  createdAt: string;
  destination: string;
  status: string;
  date: string;
}

export interface TrackingTableProps {
  filteredShipments: TrackingTypes[];
}
