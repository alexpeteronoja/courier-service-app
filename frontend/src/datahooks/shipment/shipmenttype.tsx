export type createShipmentPayload = {
  senderName: string;
  senderPhoneNo: string;
  senderAddress?: string;

  recipientName: string;
  recipientPhoneNo: string;
  recipientEmail?: string;
  recipientAddress: string;

  packageDescription: string;
  weight?: number;
  category: string;

  estimatedDelivery?: string;
};

export type createShipmentErrorResponse = {
  data: {
    message: string;
  };
};

// Edit Shipment

export type UpdateShipmentPayload = {
  shipmentId?: string;
  data: Partial<createShipmentPayload>;
};

// Add Tracking Event type

export type addTrackingEventPayload = {
  shipmentId?: string;
  data: {
    status?: string;
    description: string;
  };
};
