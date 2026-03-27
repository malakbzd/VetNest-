const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  date: Date,
  reason: String,
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Appointment", appointmentSchema);