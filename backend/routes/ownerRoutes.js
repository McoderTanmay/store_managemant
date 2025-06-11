import express from 'express';
import { storeRating } from '../controllers/ownerController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();
// Owner routes
router.get('/:storeId/ratings', authenticate, authorize('owner'), storeRating);

export default router;