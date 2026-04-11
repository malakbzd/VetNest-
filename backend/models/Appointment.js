const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  pet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pet",
    required: true, // 🔥 خليها required باش الفورم يفرض الاختيار
  },

  date: {
    type: Date,
    required: true,
  },

  reason: {
    type: String,
    required: true,
    trim: true, // 🔥 ينحي الفراغات
  },

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"], // 🔥 احترافي
    default: "pending",
  },
},
{
  timestamps: true, // 🔥 يعطيك createdAt / updatedAt
});

module.exports = mongoose.model("Appointment", appointmentSchema);