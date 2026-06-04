import { Router } from 'express';
import {
  login,
  protect,
  signUp,
  updatePassword,
} from '../controllers/authController.js';

const router = Router();

router.post('/signup', signUp);
router.post('/login', login);
router.patch('/update-password', protect, updatePassword);

export { router as authRouter };
