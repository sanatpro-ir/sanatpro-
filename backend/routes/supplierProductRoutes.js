const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// چک کردن فعال بودن اشتراک ماهانه
const requireActiveSubscription = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const isActive =
    user.subscriptionActive &&
    user.subscriptionExpiresAt &&
    new Date(user.subscriptionExpiresAt) > new Date();

  if (!isActive) {
    return res.status(403).json({ message: "اشتراک شما فعال نیست. لطفاً هزینه اشتراک را پرداخت کنید." });
  }
  next();
};

// گرفتن فقط محصولات خود کاربر لاگین‌کرده
router.get("/", protect, async (req, res) => {
  try {
    const equipments = await Equipment.find({ supplier: req.user._id })
      .populate("category", "name slug")
      .sort({ createdAt: -1 });
    res.json(equipments);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت محصولات" });
  }
});

// ساخت محصول جدید (نیاز به اشتراک فعال)
router.post("/", protect, requireActiveSubscription, upload.array("images", 5), async (req, res) => {
  try {
    const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];
    const equipment = await Equipment.create({
      ...req.body,
      images,
      supplier: req.user._id,
      isApproved: false,
    });
    res.status(201).json(equipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ویرایش محصول (نیاز به اشتراک فعال + فقط اگه مال خودش باشه)
router.put("/:id", protect, requireActiveSubscription, upload.array("images", 5), async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    if (!equipment) return res.status(404).json({ message: "محصول پیدا نشد" });

    if (equipment.supplier?.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "شما اجازه ویرایش این محصول را ندارید" });
    }

    const updateData = { ...req.body };
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((f) => `/uploads/${f.filename}`);
    }

    const updated = await Equipment.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;