export type AddTrackingFormData = {
  _id: string;
  status: string;

  senderPhoneNo: string;

  description: string;
  category: string;
};

// Tracking Table.

export interface TrackingTypes {
  _id: string;
  trackingCode: string;
  recipientName: string;
  destination: string;
  status: string;
  date: string;
}

export interface TrackingTableProps {
  filteredShipments: TrackingTypes[];
}
