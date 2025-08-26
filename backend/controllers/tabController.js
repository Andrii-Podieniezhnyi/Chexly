import Tab from "../models/Tab";
import Task from "../models/Task.js";
import mongoose from "mongoose";



// створення вкладки

export const createTab = async (req, res) => {
    
    try {
        
        const {name} = req.body;
        const userId = req.user.id;

        const newTab = new Tab ({
            name,
            userId
        })

        await newTab.save();

        res.status(201).json({
            message: 'Вкладка створена успішно',
            tab: newTab
        }
        )

    } catch (error) {
        res.status(500).json({message: 'Помилка створення вкладки', error});
    }
}


// отривання вкладок користувача

export const getTabs = async (req, res) => {

    try {
    
        const userId = req.user.id;

        const tabs = await Tab.find({userId});

        res.status(200).json({tabs});

    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні вкладок', error: message.error})
    }
    
}



// видалення вкладки



export const deleteTab = async(req, res) => {
    try {
        
        const {id} = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: 'Некоректний ID вкладки'});
        }

        const tab = await Tab.finndOne({_id: id, userId: req.user.id});

        if (!tab) {
            return res.status(404).json({message: 'Вкладка не знайдена або не належить користувачу'});
        }

        await Task.deleteMany({tabId: id});
        await tab.deleteOne();

        res.status(200).json({message: 'Вкладка та всі її завдання успішно видалені'});


    } catch (error) {
        console.error('Помилка при видаленні вкладки:', error);
        res.status(500).json({message: 'Помилка при видаленні вкладки', error: error.message});
    }
}