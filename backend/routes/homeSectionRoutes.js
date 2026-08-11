const express = require("express");
const router = express.Router();
const HomeSection = require("../models/HomeSection");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

// گرفتن بخش‌ها (عمومی)
router.get("/", async (req, res) => {
  try {
    const { type } = req.query;
    const filter = { isActive: true };
    if (type) filter.type = type;

    const sections = await HomeSection.find(filter).sort({ order: 1 });
    res.json(sections);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت محتوای صفحه" });
  }
});

// ساخت بخش جدید (با آپلود عکس)
router.post("/", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const section = await HomeSection.create(data);
    res.status(201).json(section);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ویرایش بخش (با آپلود عکس)
router.put("/:id", protect, adminOnly, upload.single("image"), async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    const section = await HomeSection.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!section) return res.status(404).json({ message: "پیدا نشد" });
    res.json(section);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    await HomeSection.findByIdAndDelete(req.params.id);
    res.json({ message: "حذف شد" });
  } catch (err) {
    res.status(500).json({ message: "خطا در حذف" });
  }
});

router.put("/reorder/bulk", protect, adminOnly, async (req, res) => {
  try {
    const { items } = req.body;
    await Promise.all(items.map((item) => HomeSection.findByIdAndUpdate(item.id, { order: item.order })));
    res.json({ message: "ترتیب بروزرسانی شد" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;