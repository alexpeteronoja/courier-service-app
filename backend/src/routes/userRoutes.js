import { Router } from 'express';
import { protect } from '../controllers/authController.js';
import {
  getAllUser,
  getMe,
  getUser,
  updateMe,
} from '../controllers/userController.js';

const router = Router();

router.route('/').get(protect, getAllUser);

router.route('/me').get(protect, getMe).patch(protect, updateMe);

router.route('/:userId').get(protect, getUser);

export { router as userRouter };
