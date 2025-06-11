import express from 'express';
import { rateStore } from '../controllers/userController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();
// User routes

router.post('/stores/:storeId/rate', authenticate, authorize('user'), rateStore);

export default router;