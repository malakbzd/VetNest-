const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔥 نجيب user كامل (باش يكون فيه role)
    const user = await User.findById(decoded.id).select("-password");

    req.user = user;

    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};