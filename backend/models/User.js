const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    password: String,
    role: {
      type: String,
      enum: ["admin", "supplier"],
      default: "supplier",
    },
    subscriptionActive: { type: Boolean, default: false },
    subscriptionExpiresAt: { type: Date, default: null },
    resetPasswordToken: { type: String, default: null },
    resetPasswordExpires: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);