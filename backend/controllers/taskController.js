import Tab from "../models/Tab.js";
import Task from "../models/Task.js";

export const createTask = async(req, res) => {
    try {
        
        const {title, category, tabId} = req.body;

        const tab = await Tab.findOne({_id: tabId, userId: req.user.id});

        if (!tab) {
            return res.status(404).json({
                message: 'Вкладка не знайдена або не надлежить користувачу'
            })
        }

        const newTask = new Task({
            title,
            category,
            tabId
        })

        await newTask.save();

        res.status(201).json({
            message: 'Завдання створено успішно',
            task: newTask
        })

    } catch (error) {
        console.error('Помилка при створенні завдання:', error);
        res.status(500).json({message: 'Помилка при створенні завдання', error})
    }
}