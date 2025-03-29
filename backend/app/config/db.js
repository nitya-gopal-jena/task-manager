const mongoose = require("mongoose");
const { ensureAdminUser } = require("./checkAndLoadIntialAdminUser");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      authSource: "admin", // ✅ Required for authentication
    });
    console.log("✅ MongoDB Connected");
    await ensureAdminUser();
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
