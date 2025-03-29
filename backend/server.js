require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./app/config/db");

const loginRoute = require("./app/routes/loginRoute");
const userRoutes = require("./app/routes/userRoutes");
const taskRoutes = require("./app/routes/taskRoutes");

const authenticateUser = require("./app/middleware/authenticator");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

const publicRoutes = ["/api/users/register", "/login"];

// Authentication middleware (applies to all routes except public ones)
app.use((req, res, next) => {
    if (publicRoutes.includes(req.path)) {
      return next(); // Skip authentication for public routes
    }
    return authenticateUser(req, res, next); // Apply authentication for other routes
  });

// Routes

// Add User Routes

app.use("/", loginRoute);
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));