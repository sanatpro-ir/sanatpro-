const mongoose = require("mongoose");

const equipmentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    description: { type: String, default: "" },
    price: { type: Number, default: 0 },
    images: [{ type: String }],
    tag: { type: String, enum: ["vip", "hot", "eco", "normal"], default: "normal" },
    stock: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
    isApproved: { type: Boolean, default: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Equipment || mongoose.model("Equipment", equipmentSchema);