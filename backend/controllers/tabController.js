import Tab from "../models/Tab";


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