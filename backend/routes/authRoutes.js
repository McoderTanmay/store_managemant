import express from 'express';
import { login, register, updatePassword } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/update-password', authenticate, updatePassword);

export default router;