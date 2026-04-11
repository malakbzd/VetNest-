const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json("No token ❌");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");

    req.user = decoded; // مهم
    next();
  } catch {
    return res.status(401).json("Invalid token ❌");
  }
};