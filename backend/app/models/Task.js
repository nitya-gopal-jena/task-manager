const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    assignedTo: { type: String, required: true }, // User ID stored as a string
    assignedBy: { type: String, required: true }, // User ID stored as a string
    dueDate: { type: Date, required: true },
    assignedToName: { type: String, required: true },
    assignedByName: { type: String, required: true },
    createdBy: { type: String, required: true }, // String instead of ObjectId
    updatedBy: { type: String }, // Optional, updated only when modified
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

module.exports = mongoose.model("Task", taskSchema);
