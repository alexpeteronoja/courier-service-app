import { Router } from 'express';
import { protect } from '../controllers/authController.js';
import {
  deleteUser,
  getAllUser,
  getMe,
  getUser,
  toggleUserStatus,
  updateMe,
} from '../controllers/userController.js';

const router = Router();

router.route('/').get(protect, getAllUser);

router.route('/me').get(protect, getMe).patch(protect, updateMe);

router.route('/:userId').get(protect, getUser).delete(deleteUser);

router.patch('/:userId/toggle-status', toggleUserStatus);

export { router as userRouter };
