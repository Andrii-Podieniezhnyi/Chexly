import Task from '../models/Task.js';


// створення таску
export const createTask = async (req, res) => {
  try {
    const { name, tabId } = req.body;

    if (!name || !tabId) {
      return res.status(400).json({ message: 'Назва та вкладка обовʼязкові' });
    }

    const task = await Task.create({
      name,
      tabId,
      userId: req.user.id,
    });

    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Помилка при створенні завдання', error });
  }
};

// отримати таски по вкладці
export const getTasksByTab = async (req, res) => {
  try {
    const tasks = await Task.find({
      tabId: req.params.tabId,
      userId: req.user.id
    });

    res.json({ tasks });
  } catch (error) {
    res.status(500).json({ message: 'Помилка при завантаженні завдань', error });
  }
};

// оновлення (наприклад, completed)
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!task) return res.status(404).json({ message: 'Завдання не знайдено' });

    res.json({ task });
  } catch (error) {
    res.status(500).json({ message: 'Помилка при оновленні завдання', error });
  }
};

// видалення
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!task) return res.status(404).json({ message: 'Завдання не знайдено' });

    res.json({ message: 'Завдання видалене' });
  } catch (error) {
    res.status(500).json({ message: 'Помилка при видаленні завдання', error });
  }
};