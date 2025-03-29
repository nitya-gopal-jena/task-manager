const bcrypt = require("bcryptjs");
const User = require("../models/User");

const ensureAdminUser = async () => {
  try {
    const adminExists = await User.findOne({ role: "ADMIN" });

    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10); // Default password

      const adminUser = new User({
        name: "Admin User",
        userName: "admin",
        email: "admin@taskmanager.com",
        mobile: "0000000000",
        password: hashedPassword,
        role: "ADMIN",
        createdBy: "SYSTEM",
        updatedBy: "SYSTEM",
      });

      
      await adminUser.save();
      console.log("🛠️ Default ADMIN user created.");
    } else {
      console.log("✅ ADMIN user already exists.");
    }
  } catch (error) {
    console.error("❌ Error checking/creating ADMIN user:", error);
  }
};

module.exports = { ensureAdminUser };
