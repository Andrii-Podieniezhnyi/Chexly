import Tab from "../models/Tab.js";
import Task from "../models/Task.js";
import mongoose from "mongoose";


export const getTasksByTab = async (req, res) => {
    try {
        const { tabId } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(tabId)) {
            return res.status(400).json({ message: 'Невірний формат tabId' });
        }

        const tab = await Tab.findOne({ _id: tabId, userId: req.user.id });
        if (!tab) {
            return res.status(404).json({ message: 'Вкладка не знайдена або не належить користувачу' });
        }
        
        const tasks = await Task.find({ tabId });

        res.json({ tasks });

    } catch (error) {
        console.error('Помилка при отриманні завдань:', error);
        res.status(500).json({ message: 'Помилка при отриманні завдань', error: error.message });
    }
};