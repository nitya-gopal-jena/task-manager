const express = require("express");
const { createTask, listTasks } = require("../controllers/taskController");

const router = express.Router();

// Register User
router.post("/", createTask);
router.get("/", listTasks);
module.exports = router;
