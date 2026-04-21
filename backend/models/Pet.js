const mongoose = require("mongoose");

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  age: { type: Number, required: true },
  ageUnit: { type: String, default: "years" }, // ✅ add this
  ownerName: { type: String }, // ✅ optional
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });
module.exports = mongoose.model("Pet", petSchema);