const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// گرفتن همه دسته‌ها (عمومی — برای نمایش تو سایت)
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ order: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت دسته‌بندی‌ها" });
  }
});

// ساخت دسته جدید (فقط ادمین)
router.post("/", protect, adminOnly, async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ویرایش دسته (فقط ادمین)
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).json({ message: "دسته پیدا نشد" });
    res.json(category);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// حذف دسته (فقط ادمین)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "دسته حذف شد" });
  } catch (err) {
    res.status(500).json({ message: "خطا در حذف" });
  }
});

module.exports = router;