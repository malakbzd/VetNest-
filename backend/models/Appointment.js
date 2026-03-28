const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // ← ADD THIS
  pet: { type: mongoose.Schema.Types.ObjectId, ref: "Pet" },
  date: { type: Date, required: true },
  reason: { type: String, required: true },
  status: { type: String, default: "pending" },
});

module.exports = mongoose.model("Appointment", appointmentSchema);