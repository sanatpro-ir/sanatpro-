const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
  name: String,
  email: String,
  // ... بقیه فیلدها
});

// این خط مشکل OverwriteModelError رو حل می‌کنه
const Supplier = mongoose.models.Supplier || mongoose.model("Supplier", supplierSchema);

module.exports = Supplier;
