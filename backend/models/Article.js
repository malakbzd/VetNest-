const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  link: String,     
  category: String     
});

module.exports = mongoose.model("Article", articleSchema);