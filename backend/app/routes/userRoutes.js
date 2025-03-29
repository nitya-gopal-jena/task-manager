const express = require("express");
const { registerUser } = require("../controllers/userController");
const registerLimiter = require("../config/rateLimiter");

const router = express.Router();

// Register User
router.post("/register", registerLimiter, registerUser);

module.exports = router;