const rateLimit = require("express-rate-limit");

const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 15, // Max 5 requests per window per IP
  message: {
    error: "Too many registration attempts. Please try again later."
  },
  headers: true
});

module.exports = registerLimiter;
