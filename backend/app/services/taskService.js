const Task = require("../models/Task");
const User = require("../models/User");

const createTask = async ({ title, description, assignedTo, dueDate }, user) => {
  const createdBy = user.userId; // Extracted from JWT token
  const createdByName = user.name; // Extracted from JWT token
  const role = user.role; // Extracted from JWT token

  let assignedToUserId = createdBy;
  let assignedToName = createdByName;

  if (role === "USER" && assignedTo && assignedTo != createdBy) {
    throw new Error("You can only create tasks for yourself.");
  }

  // If ADMIN assigns a task to another user
  if (user.role === "ADMIN" && assignedTo) {
    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) throw new Error("Assigned user not found");
    assignedToUserId = assignedUser._id;
    assignedToName = assignedUser.name;
  }

  const task = new Task({
    title,
    description,
    assignedTo: assignedToUserId,
    assignedBy: createdBy,
    dueDate,
    assignedToName,
    assignedByName: createdByName,
    createdBy,
    createdByName
  });

  await task.save();
  return task;
};

const listAllTasks = async (req, user) => {
  try {
    const { userId, role } = user; // Extract user info from JWT token
    const { page = 1, limit = 10, assignedTo, assignedBy } = req.query;

    let filter = {};


    // If filters are provided, find the corresponding user IDs
    if (assignedTo) {
      const assignedUser = await User.findOne({ name: { $regex: `.*${assignedTo}.*`, $options: "i" }, });
      if (assignedUser) {
        filter.assignedTo = assignedUser._id;
      } else {
        throw new Error("Assigned user not found.");
      }
    }

    if (assignedBy) {
      const assignedByUser = await User.findOne({ name: { $regex: `.*${assignedBy}.*`, $options: "i" }, });
      if (assignedByUser) {
        filter.assignedBy = assignedByUser._id;
      } else {
        throw new Error("Assigned by user not found.");
      }
    }

    // Normal users can only see their own tasks
    if (role === "USER") {
      if (filter.assignedTo && filter.assignedTo.toString() != userId) {
        throw new Error("No records found.");
      }
      filter.assignedTo = userId;
    }


    // Fetch tasks with pagination
    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    // Get total count for pagination metadata
    const totalCount = await Task.countDocuments(filter);

    return {
      tasks,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: parseInt(page),
      totalTasks: totalCount,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { createTask, listAllTasks };
