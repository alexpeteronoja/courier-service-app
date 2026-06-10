// shipment Form

export type ShipmentFormDataTypes = {
  _id: string;
  description: string;
  senderName: string;
  senderPhoneNo: string;
  senderAddress?: string;

  recipientName: string;
  recipientPhoneNo: string;
  recipientEmail?: string;
  recipientAddress: string;

  packageDescription: string;
  packageLocation: string;
  weight?: number;
  category: string;

  estimatedDelivery?: string;
};

// Shipment Table Types

export interface ShipmentTypes extends ShipmentFormDataTypes {
  _id: string;
  recipientName: string;
  trackingCode: string;
  destination?: string | "";
  createdAt: string;
  status: string;
  date: string;
}

export interface DashboardTableProps {
  filteredShipments: ShipmentTypes[];
}
