import express from 'express';
import { createTab, getTabs } from '../controllers/tabController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/tabs', authMiddleware, createTab);
router.get('/tabs', authMiddleware, getTabs);

export default router;