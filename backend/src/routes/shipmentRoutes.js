import { Router } from 'express';
import {
  addTrackingEvent,
  createShipment,
  deleteShipment,
  deleteTrackingEvent,
  getAllShipments,
  getShipment,
  updateShipment,
} from '../controllers/shipmentController.js';
import { authorize, protect } from '../controllers/authController.js';

const router = Router();

router.route('/').get(getAllShipments).post(protect, createShipment);

router
  .route('/:shipmentId')
  .get(protect, getShipment)
  .patch(protect, updateShipment)
  .delete(protect, authorize('admin'), deleteShipment);

router.patch('/:trackingCode/events', protect, addTrackingEvent);
router.delete('/:shipmentId/events/:eventId', protect, deleteTrackingEvent);

export { router as shipmentRouter };
