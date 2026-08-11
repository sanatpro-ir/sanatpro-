const express = require("express");
const router = express.Router();
const UsedEquipment = require("../models/UsedEquipment");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// گرفتن لیست تایید شده (عمومی — برای صفحه UsedMarket)
router.get("/", async (req, res) => {
  try {
    const items = await UsedEquipment.find({ isActive: true, isApproved: true }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت تجهیزات دست دوم" });
  }
});

// گرفتن همه (شامل تاییدنشده‌ها) — فقط ادمین، برای پنل مدیریت
router.get("/admin/all", protect, adminOnly, async (req, res) => {
  try {
    const items = await UsedEquipment.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت" });
  }
});

// گرفتن یک آیتم
router.get("/:id", async (req, res) => {
  try {
    const item = await UsedEquipment.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "پیدا نشد" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: "خطا" });
  }
});

// ثبت آگهی جدید (عمومی — هرکسی می‌تونه ثبت کنه، بدون نیاز به لاگین)
router.post(
  "/",
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const images = req.files?.images ? req.files.images.map((f) => `/uploads/${f.filename}`) : [];
      const video = req.files?.video ? `/uploads/${req.files.video[0].filename}` : "";

      const item = await UsedEquipment.create({
        ...req.body,
        images,
        video,
        isApproved: false, // منتظر تایید ادمین
      });
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// تایید آگهی (فقط ادمین)
router.put("/:id/approve", protect, adminOnly, async (req, res) => {
  try {
    const item = await UsedEquipment.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ویرایش (فقط ادمین)
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "video", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const updateData = { ...req.body };
      if (req.files?.images) {
        updateData.images = req.files.images.map((f) => `/uploads/${f.filename}`);
      }
      if (req.files?.video) {
        updateData.video = `/uploads/${req.files.video[0].filename}`;
      }
      const item = await UsedEquipment.findByIdAndUpdate(req.params.id, updateData, { new: true });
      res.json(item);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
);

// حذف (فقط ادمین)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await UsedEquipment.findByIdAndDelete(req.params.id);
    res.json({ message: "حذف شد" });
  } catch (err) {
    res.status(500).json({ message: "خطا در حذف" });
  }
});

module.exports = router;