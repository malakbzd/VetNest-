require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/patients", require("./routes/Routes"));

app.get("/", (req, res) => {
  res.send("API running...");
});

// PORT من .env (مش ثابت)
const PORT = process.env.PORT || 5000;

// server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});