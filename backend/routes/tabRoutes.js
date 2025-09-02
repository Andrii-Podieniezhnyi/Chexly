import express from 'express';
import { createTab, getTabs, deleteTab } from '../controllers/tabController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/tabs', authMiddleware, createTab);
router.get('/tabs', authMiddleware, getTabs);
router.delete('/tabs/:id', authMiddleware, deleteTab);

export default router;