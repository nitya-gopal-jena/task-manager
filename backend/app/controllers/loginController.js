const authService = require("../config/authConfig");

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const response = await authService.loginUser({ userName, password });
    res.json(response);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { login };
