import { Router } from 'express';
import {
  addTrackingEvent,
  createShipment,
  deleteShipment,
  deleteTrackingEvent,
  getAllShipments,
  getShipment,
  trackShipment,
  updateShipment,
} from '../controllers/shipmentController.js';
import { protect } from '../controllers/authController.js';

const router = Router();

router.route('/').get(protect, getAllShipments).post(protect, createShipment);

// authorize('admin')

router
  .route('/:shipmentId')
  .get(protect, getShipment)
  .patch(protect, updateShipment)
  .delete(protect, deleteShipment);

router.get('/track/:trackingId', trackShipment);

router.patch('/:shipmentId/events', protect, addTrackingEvent);
router.delete('/:shipmentId/events/:eventId', protect, deleteTrackingEvent);

export { router as shipmentRouter };
