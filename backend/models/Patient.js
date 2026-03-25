const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  species: String,
  owner: String
}, { timestamps: true });

module.exports = mongoose.model("Patient", patientSchema);