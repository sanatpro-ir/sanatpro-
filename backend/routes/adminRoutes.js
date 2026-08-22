const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Supplier = require("../models/Supplier");
const Inquiry = require("../models/Inquiry");
const User = require("../models/User");
const { protect, adminOnly } = require("../middleware/authMiddleware");

/* =========================
   SUPPLIERS
========================= */

router.get("/suppliers", protect, adminOnly, async (req, res) => {
  try {
    const suppliers = await Supplier.find().sort({ createdAt: -1 });
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch suppliers" });
  }
});

router.delete("/supplier/:id", protect, adminOnly, async (req, res) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete supplier" });
  }
});

/* =========================
   INQUIRIES
========================= */

router.get("/inquiries", protect, adminOnly, async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch inquiries" });
  }
});

/* =========================
   USERS
========================= */

router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ _id: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "خطا در دریافت کاربران" });
  }
});

router.put("/users/:id/role", protect, adminOnly, async (req, res) => {
  try {
    const { role } = req.body;
    if (!["admin", "supplier"].includes(role)) {
      return res.status(400).json({ message: "نقش نامعتبر است" });
    }
    const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "کاربر پیدا نشد" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "کاربر حذف شد" });
  } catch (error) {
    res.status(500).json({ message: "خطا در حذف کاربر" });
  }
});

// ورود ادمین به پنل یک کاربر خاص (impersonation)
router.post("/users/:id/impersonate", protect, adminOnly, async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id).select("-password");
    if (!targetUser) {
      return res.status(404).json({ message: "کاربر پیدا نشد" });
    }

    const token = jwt.sign(
      {
        id: targetUser._id,
        role: targetUser.role,
        impersonatedBy: req.user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: targetUser });
  } catch (error) {
    console.error("Impersonate error:", error);
    res.status(500).json({ message: "خطا در ورود به پنل کاربر" });
  }
});

module.exports = router;