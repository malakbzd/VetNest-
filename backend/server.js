const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");
const multer = require("multer");

dotenv.config();
connectDB();

const app = express(); // 👈 لازم تجي قبل app.use

// ===== MIDDLEWARE =====
app.use(cors());
app.use(express.json());

// ===== STATIC FILES =====
app.use("/uploads", express.static("uploads"));

// ===== MULTER CONFIG =====
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ===== ROUTES =====
app.use("/api/pets", require("./routes/petRoutes"));
app.use("/api/appointments", require("./routes/appointmentRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/articles", require("./routes/articleRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// ===== TEST ROUTE =====
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ===== SERVER =====
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
