import express from 'express';
import { createTask } from '../controllers/taskController';
import { getTasksByTab } from '../controllers/getTasksByTab.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/tasks', authMiddleware, createTask);

router.get('/tabs/:tabId/tasks', authMiddleware, getTasksByTab);

export default router;