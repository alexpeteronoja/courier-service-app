/** Shipment type */
export type ParcelEventProps = {
  time: string;
  title: string;
  detail: string;
  done: boolean;
  location: string;
  timestamp: string;
  description: string;
  status: string;
};

export type ParcelStatusType = "Delivered" | "In Transit" | "Pending" | string;

export interface TrackParcelTypes {
  id: string;
  status: ParcelStatusType;
  progress: number;
  sender: string;
  receiver: string;
  origin: string;
  dest: string;
  weight: string;
  type: string;
  eta: string;
  events: ParcelEventProps[];
}
