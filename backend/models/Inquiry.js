const mongoose = require("mongoose");

const inquirySchema = new mongoose.Schema({
  name: String,
  company: String,
  phone: String,
  email: String,
  product: String,
  message: String,
  status: { type: String, default: "new" }
}, { timestamps: true });

module.exports = mongoose.model("Inquiry", inquirySchema);
