import express from 'express';
import { createTask, updateTask, deleteTask} from '../controllers/taskController.js';
import { getTasksByTab } from '../controllers/getTasksByTab.js';
import { authMiddleware } from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/tasks', authMiddleware, createTask);

router.get('/tabs/:tabId/tasks', authMiddleware, getTasksByTab);

router.delete('/tasks/:id', authMiddleware, deleteTask);

router.put('/tasks/:id', authMiddleware, updateTask);

export default router;