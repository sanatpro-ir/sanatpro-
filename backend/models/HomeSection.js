const mongoose = require("mongoose");

const homeSectionSchema = new mongoose.Schema(
  {
        type: {
      type: String,
      enum: ["hero", "industry", "promo", "ad", "stat", "shop_ad"],
      required: true,
    },
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    icon: { type: String, default: "" }, // اسم آیکون (مثلا FaFire) یا مسیر عکس
    image: { type: String, default: "" },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.models.HomeSection || mongoose.model("HomeSection", homeSectionSchema);