const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, enum: ["health", "nutrition", "training", "behavior", "general"], default: "general" },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 add this line
  image: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Article", articleSchema);