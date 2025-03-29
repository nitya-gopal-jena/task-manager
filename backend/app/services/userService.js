const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async (userData) => {
  const { name, userName, email, mobile, password, createdBy, role } = userData;

  if (!name || !userName || !email || !mobile || !password) {
    throw new Error("All fields are required");
  }

  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create new user
  const newUser = new User({
    name,
    userName,
    email,
    mobile,
    password: hashedPassword,
    role: role || "USER", // ✅ Default role to USER
    createdBy,
    updatedBy: createdBy
  });

  await newUser.save();
  return { message: "User registered successfully" };
};

module.exports = { registerUser };
