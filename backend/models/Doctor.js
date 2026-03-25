const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  phone: String,
  email: String,
});

module.exports = mongoose.model("Doctor", DoctorSchema);