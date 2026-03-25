const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  phone: String,
  email: String
}, { timestamps: true });

module.exports = mongoose.model("Doctor", doctorSchema);