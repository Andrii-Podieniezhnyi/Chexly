import Tab from "../models/Tab.js";
import Task from "../models/Task.js";
import mongoose from "mongoose";


// Створення завдання

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




// Видалення завдання

export const deleteTask = async (req, res) => {

    try {
        
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Некоректний ID завдання'})
        }

        const task = await Task.findById(id);

        if (!task) {
            return res.status(404).json({message: 'Завдання не знайдено'})
        }

        const tab = await Tab.findOne({_id: task.tabId, userId: req.user.id});

        if(!tab) {
            return res.status(403).json({message: 'Ви не маєте доступу для видалення цього завдання'})
        }

        await task.deleteOne();

        res.status(200).json({message: 'Завдання успішно видалено'});


    } catch (error) {
        console.error('Помилка при видаленні завдання', error);
        res.status(500).json({message: 'Помилка при видаленні завдання', error: error.message});
    }
}



// Оновлення завдання
export const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body; // те, що ми хочемо оновити

        // 1. Перевіряємо валідність id
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Невірний формат taskId" });
        }

        // 2. Знаходимо завдання
        const task = await Task.findById(id);
        if (!task) {
            return res.status(404).json({ message: "Завдання не знайдено" });
        }

        // 3. Перевіряємо, чи ця таска належить вкладці користувача
        const tab = await Tab.findOne({ _id: task.tabId, userId: req.user.id });
        if (!tab) {
            return res.status(403).json({ message: "Це завдання не належить вашій вкладці" });
        }

        // 4. Оновлюємо дані
        if (title !== undefined) task.title = title;
        if (completed !== undefined) task.completed = completed;

        await task.save();

        res.status(200).json({ message: "Завдання оновлено", task });

    } catch (error) {
        console.error("Помилка при оновленні завдання:", error);
        res.status(500).json({ message: "Помилка при оновленні завдання", error: error.message });
    }
};