const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  link: String,        // ✅ جديد
  category: String     // ✅ جديد
});

module.exports = mongoose.model("Article", articleSchema);