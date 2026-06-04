import { Shipment } from '../model/shipmentModel';

export const updateShipmentStatus = ({
  shipmentId,
  status,
  description,
  //   location,
  user,
}) => {
  return Shipment.findByIdAndUpdate(shipmentId, {
    $set: { status },
    $push: {
      events: {
        status,
        description,
        // location,
        handler: {
          userId: user._id,
          name: user.name,
          role: user.role,
        },
        timestamp: new Date(),
      },
    },
  });
};
