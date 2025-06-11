import express from 'express';
import { getAllUsers, getAllStores, getStoreRatings, addUser, addStore, getDashboard } from '../controllers/adminController.js';
import { authenticate, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();
// Admin routes
router.get('/users', authenticate, authorize('admin'), getAllUsers);
router.get('/stores', authenticate, authorize('admin', 'user'), getAllStores);
router.get('/stores/:storeId/ratings', authenticate, authorize('admin'), getStoreRatings);
router.post('/users', authenticate, authorize('admin'), addUser);
router.post('/stores', authenticate, authorize('admin'), addStore);
router.get('/dashboard', authenticate, authorize('admin'), getDashboard);

export default router;