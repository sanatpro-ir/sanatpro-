const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    equipment: { type: mongoose.Schema.Types.ObjectId, ref: "Equipment", required: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    buyerName: { type: String, required: true },
    buyerPhone: { type: String, required: true },
    buyerCompany: { type: String },
    quantity: { type: Number, required: true, default: 1 },
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
    note: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Order || mongoose.model("Order", orderSchema);