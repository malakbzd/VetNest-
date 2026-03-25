const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true,
      trim: true
    },

    email: { 
      type: String, 
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: { 
      type: String, 
      required: true,
      minlength: 6
    },

    // 🔥 مهم باش تفصل systems
    role: {
      type: String,
      enum: ["admin", "doctor", "user"],
      default: "user"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);