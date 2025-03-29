const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body, req.user);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const listTasks = async (req, res) => {
    try {
      const task = await taskService.listAllTasks(req, req.user);
      res.status(201).json(task);
    } catch (error) {
        console.log("error:", error);
        
      res.status(400).json({ message: error.message });
    }
  };

module.exports = { createTask , listTasks};
