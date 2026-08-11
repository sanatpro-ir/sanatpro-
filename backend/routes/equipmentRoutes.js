const express = require("express");
const router = express.Router();
const Equipment = require("../models/Equipment");
const Category= require("../models/Category");

const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// گرفتن لیست تجهیزات با فیلتر و صفحه‌بندی (عمومی)
router.get("/", async (req, res) => {
  try {
    const { category, tag, search, page = 1, limit = 20 } = req.query;
    const filter = { isActive: true, isApproved: true };
    if (category) filter.category = category;
    if (tag) filter.tag = tag;
    if (search) filter.title = { $regex: search, $options: "i" };

    const equipments = await Equipment.find(filter)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Equipment.countDocuments(filter);
    res.json({ equipments, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت تجهیزات" });
  }
});

// گرفتن یک تجهیز
router.get("/:id", async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id).populate("category", "name slug");
    if (!equipment) return res.status(404).json({ message: "تجهیز پیدا نشد" });
    res.json(equipment);
  } catch (err) {
    res.status(500).json({ message: "خطا" });
  }
});
// گرفتن همه‌ی محصولات شامل تاییدنشده‌ها (فقط ادمین، برای پنل مدیریت)
router.get("/admin/pending", protect, adminOnly, async (req, res) => {
  try {
    const items = await Equipment.find({ isApproved: false })
      .populate("category", "name slug")
      .populate("supplier", "name email")
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت" });
  }
});

// تایید محصول تامین‌کننده (فقط ادمین)
router.put("/:id/approve", protect, adminOnly, async (req, res) => {
  try {
    const equipment = await Equipment.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    );
    if (!equipment) return res.status(404).json({ message: "محصول پیدا نشد" });
    res.json(equipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ساخت تجهیز جدید با آپلود عکس (فقط ادمین)
router.post("/", protect, adminOnly, upload.array("images", 5), async (req, res) => {
  try {
    const images = req.files ? req.files.map((f) => `/uploads/${f.filename}`) : [];
    const equipment = await Equipment.create({ ...req.body, images });
    res.status(201).json(equipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ویرایش تجهیز (فقط ادمین)
router.put("/:id", protect, adminOnly, upload.array("images", 5), async (req, res) => {
  try {
    const updateData = { ...req.body };
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((f) => `/uploads/${f.filename}`);
    }
    const equipment = await Equipment.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!equipment) return res.status(404).json({ message: "تجهیز پیدا نشد" });
    res.json(equipment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// حذف تجهیز (فقط ادمین)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await Equipment.findByIdAndDelete(req.params.id);
    res.json({ message: "تجهیز حذف شد" });
  } catch (err) {
    res.status(500).json({ message: "خطا در حذف" });
  }
});

module.exports = router;