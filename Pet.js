const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: String,
  type: String,
  age: Number,
  ownerName: String,
});

module.exports = mongoose.model("Pet", petSchema);