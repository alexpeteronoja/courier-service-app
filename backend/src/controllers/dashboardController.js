import { Shipment } from '../model/shipmentModel.js';
import { catchAsync } from '../utils/catchAsync.js';
import { successResponse } from '../utils/response.js';

export const getOverview = catchAsync(async (req, res, next) => {
  const [result] = await Shipment.aggregate([
    { $match: { isArchived: false } },
    {
      $group: {
        _id: null,
        totalShipments: { $sum: 1 },
        inTransit: {
          $sum: {
            $cond: [{ $eq: ['$status', 'in_transit'] }, 1, 0],
          },
        },
        delivered: {
          $sum: {
            $cond: [{ $eq: ['$status', 'delivered'] }, 1, 0],
          },
        },
        exception: {
          $sum: {
            $cond: [{ $eq: ['$status', 'exception'] }, 1, 0],
          },
        },
      },
    },
  ]);

  //     const [totalShipments, inTransit, delivered, exception] = await Promise.all([
  //     Shipment.countDocuments({ isArchived: false }),
  //     Shipment.countDocuments({ isArchived: false, status: 'in_transit' }),
  //     Shipment.countDocuments({ isArchived: false, status: 'delivered' }),
  //     Shipment.countDocuments({ isArchived: false, status: 'exception' }),
  //   ]);

  const overview = result || {
    totalShipments: 0,
    inTransit: 0,
    delivered: 0,
    exception: 0,
  };
  successResponse(
    res,
    200,
    {
      data: {
        overview,
      },
    },
    'Dashboard overview retrieved.',
  );
});
