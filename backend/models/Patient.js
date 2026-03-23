const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  species: String,     // cat, dog...
  owner: String,       // صاحب الحيوان
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Patient", patientSchema);