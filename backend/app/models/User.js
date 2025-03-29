const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    createdBy: { type: String, required: false },
    updatedBy: { type: String },
  },
  { timestamps: true } // Auto-adds createdAt & updatedAt
);

module.exports = mongoose.model("User", userSchema);
