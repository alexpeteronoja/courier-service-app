import { Router } from 'express';
import { protect } from '../controllers/authController.js';
import { getOverview } from '../controllers/dashboardController.js';

const router = Router();

router.use(protect);

router.get('/overview', getOverview);

export { router as dashboardRouter };
