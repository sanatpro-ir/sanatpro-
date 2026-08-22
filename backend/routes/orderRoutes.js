const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Equipment = require("../models/Equipment");
const { protect } = require("../middleware/authMiddleware");

// ثبت سفارش جدید (خریدار عضو سایت نیست، پس نیازی به لاگین نداره)
router.post("/", async (req, res) => {
  try {
    const { equipmentId, buyerName, buyerPhone, buyerCompany, quantity, note } = req.body;

    if (!equipmentId || !buyerName || !buyerPhone || !quantity) {
      return res.status(400).json({ message: "لطفاً همه فیلدهای ضروری (نام، شماره تماس، تعداد) را پر کنید" });
    }

    const equipment = await Equipment.findById(equipmentId);
    if (!equipment) {
      return res.status(404).json({ message: "محصول مورد نظر پیدا نشد" });
    }

    const totalPrice = (equipment.price || 0) * Number(quantity);

    const order = await Order.create({
      equipment: equipment._id,
      supplier: equipment.supplier,
      buyerName,
      buyerPhone,
      buyerCompany,
      quantity,
      totalPrice,
      note,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// گرفتن سفارش‌های ساپلایر لاگین‌کرده
router.get("/mine", protect, async (req, res) => {
  try {
    const orders = await Order.find({ supplier: req.user._id })
      .populate("equipment", "title images")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت سفارش‌ها" });
  }
});

// آپدیت وضعیت سفارش (فقط توسط ساپلایر مالک سفارش)
router.put("/:id/status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "وضعیت نامعتبر است" });
    }

    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "سفارش پیدا نشد" });

    if (order.supplier.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "شما اجازه ویرایش این سفارش را ندارید" });
    }

    order.status = status;
    await order.save();
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// گرفتن همه سفارش‌ها (فقط ادمین)
router.get("/admin/all", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "دسترسی ندارید" });
    }
    const orders = await Order.find()
      .populate("equipment", "title")
      .populate("supplier", "name email phone")
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "خطا در دریافت سفارش‌ها" });
  }
});

module.exports = router;