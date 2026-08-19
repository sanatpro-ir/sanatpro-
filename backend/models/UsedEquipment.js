const mongoose = require("mongoose");

const usedEquipmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      default: "",
      trim: true,
    },

    brand: {
      type: String,
      default: "",
      trim: true,
    },

    year: {
      type: String,
      default: "",
    },

    condition: {
      type: String,
      enum: [
        "نو",
        "کارکرده - سالم",
        "نیازمند تعمیر",
        "بازسازی شده",
        "استوک پروژه",
      ],
      default: "کارکرده - سالم",
    },

    location: {
      type: String,
      default: "",
    },

    suggestedPrice: {
      type: Number,
      default: 0,
    },

    contactName: {
      type: String,
      default: "",
    },

    contactPhone: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    images: [
      {
        type: String,
      },
    ],

    video: {
      type: String,
      default: "",
    },

    isApproved: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.UsedEquipment ||
  mongoose.model("UsedEquipment", usedEquipmentSchema);