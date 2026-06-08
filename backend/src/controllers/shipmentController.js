/* eslint-disable prefer-destructuring */
import { Shipment } from '../model/shipmentModel.js';
import APIFeatures from '../utils/apiFeatures.js';
import { AppError } from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';
import { successResponse } from '../utils/response.js';

export const createShipment = catchAsync(async (req, res, next) => {
  const shipmentData = {
    ...req.body,
    createdBy: req.user._id,
    events: [
      {
        status: 'pending',
        description: 'Shipment registered and tracking code generated.',
        handler: {
          userId: req.user._id,
          name: req.user.name,
          role: req.user.role,
        },
      },
    ],
  };

  const newShipment = await Shipment.create(shipmentData);

  successResponse(
    res,
    201,
    { data: { shipment: newShipment } },
    `Shipment created. Tracking code: ${newShipment.trackingCode}`,
  );
});

// Get all Shipment

export const getAllShipments = catchAsync(async (req, res, next) => {
  const shipmentFeatures = new APIFeatures(Shipment.find(), req.query)
    .filter()
    .sorting()
    .limitFields()
    .pagination();

  const shipment = await shipmentFeatures.queryModel;
  const length = shipment.length;

  successResponse(
    res,
    200,
    { data: { length, shipment } },
    'Shipments retrieved',
  );
});

// get a shipment

export const getShipment = catchAsync(async (req, res, next) => {
  const id = req.params.shipmentId;

  const shipment = await Shipment.findById(id);

  if (!shipment) return next(new AppError('Shipment not found', 404));

  successResponse(res, 200, { data: { shipment } }, 'Shipments retrieved');
});

// Public Get Shipment Details by Tracking Id

export const trackShipment = catchAsync(async (req, res, next) => {
  const trackingCode = req.params.trackingId;

  const shipment = await Shipment.findOne({
    trackingCode: trackingCode.toUpperCase(),
  });

  if (!shipment) return next(new AppError('Invalid Tracking Id', 400));

  successResponse(res, 200, { data: { shipment } }, 'Shipments retrieved');
});

// update shipment

export const updateShipment = catchAsync(async (req, res, next) => {
  // eslint-disable-next-line no-unused-vars
  const { trackingCode, events, status, ...updatedData } = req.body;

  const shipment = await Shipment.findByIdAndUpdate(
    req.params.shipmentId,
    updatedData,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!shipment) return next(new AppError('Shipment not found', 404));

  successResponse(res, 200, { data: { shipment } }, 'Shipments Updateds');
});

// delete Shipment

export const deleteShipment = catchAsync(async (req, res, next) => {
  const shipment = await Shipment.findByIdAndUpdate(
    req.params.shipmentId,
    { isArchived: true },
    { new: true },
  );

  if (!shipment) return next(new AppError('Shipment not found', 404));

  successResponse(res, 204, { data: {} }, 'Shipments Deleted successfully');
});

// add tracking event

export const addTrackingEvent = catchAsync(async (req, res, next) => {
  const { shipmentId } = req.params;
  const { status, description, notes } = req.body;

  // const shipment = await Shipment.findOne({
  //   trackingCode: trackingCode.toUpperCase(),
  // });

  const shipment = await Shipment.findById(shipmentId);
  if (!shipment) return next(new AppError(`No shipment found`, 404));

  // new event
  const newEvent = {
    status,
    description,
    handler: {
      userId: req.user._id,
      name: req.user.name,
      role: req.user.role,
    },
    notes: notes || '',
    timestamp: new Date(),
  };

  shipment.events.push(newEvent);
  shipment.status = status;

  // If delivered, record the actual delivery date
  if (status === 'delivered') {
    shipment.actualDelivery = new Date();
  }

  const updatedShipment = await shipment.save();

  successResponse(
    res,
    200,
    { data: { shipment: updatedShipment } },
    'Tracking Event Added',
  );
});

// deleteTrackingEvent

export const deleteTrackingEvent = catchAsync(async (req, res, next) => {
  const shipment = await Shipment.findById(req.params.shipmentId);
  if (!shipment) return next(new AppError('Shipment not found.', 404));

  const eventIndex = shipment.events.findIndex(
    (e) => e._id.toString() === req.params.eventId,
  );
  if (eventIndex === -1) return next(new AppError('Event not found.', 404));

  shipment.events.splice(eventIndex, 1);

  // Re-sync status from the latest remaining event
  if (shipment.events.length > 0) {
    shipment.status = shipment.events[shipment.events.length - 1].status;
  } else {
    shipment.status = 'pending';
  }

  const updatedShipment = await shipment.save();

  successResponse(
    res,
    204,
    { data: { shipment: updatedShipment } },
    'Tracking Event Deleted',
  );
});
