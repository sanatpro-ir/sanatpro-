const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const { register, login } = require("../controllers/authController");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

router.post("/register", register);
router.post("/login", login);

// درخواست بازیابی پسورد
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      // برای امنیت، پیغام یکسان می‌دیم چه یوزر باشه چه نباشه
      return res.json({ message: "اگر این ایمیل ثبت شده باشد، لینک بازیابی ارسال می‌شود." });
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // ۱ ساعت اعتبار
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendEmail(
      user.email,
      "بازیابی رمز عبور - SANAT PRO",
      `
        <div style="font-family: Tahoma; direction: rtl; text-align: right;">
          <h2>بازیابی رمز عبور</h2>
          <p>برای تنظیم رمز عبور جدید، روی لینک زیر کلیک کنید:</p>
          <a href="${resetUrl}" style="background:#facc15;color:#000;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block;">تنظیم رمز جدید</a>
          <p>این لینک تا ۱ ساعت دیگر معتبر است.</p>
          <p>اگر این درخواست را شما نداده‌اید، این ایمیل را نادیده بگیرید.</p>
        </div>
      `
    );

    res.json({ message: "اگر این ایمیل ثبت شده باشد، لینک بازیابی ارسال می‌شود." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در ارسال ایمیل" });
  }
});

// تنظیم پسورد جدید با توکن
router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;
    const user = await User.findOne({
      resetPasswordToken: req.params.token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "لینک نامعتبر یا منقضی شده است." });
    }

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    res.json({ message: "رمز عبور با موفقیت تغییر کرد." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطا در تغییر رمز عبور" });
  }
});

module.exports = router;