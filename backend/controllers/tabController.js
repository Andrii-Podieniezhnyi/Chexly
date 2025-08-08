import Tab from "../models/Tab";

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