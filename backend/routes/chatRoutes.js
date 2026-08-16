const express = require("express");
const router = express.Router();

const ChatMessage = require("../models/ChatMessage");

// دریافت پیام‌ها
router.get("/", async (req, res) => {
  try {
    const messages = await ChatMessage.find()
      .sort({ createdAt: 1 })
      .limit(200)
      .lean();

    res.json(messages);
  } catch (err) {
    console.error("GET chat error:", err);
    res.status(500).json({
      message: "خطا در دریافت پیام‌ها",
    });
  }
});

// ارسال پیام
router.post("/", async (req, res) => {
  try {
    const { name, message } = req.body;

    if (!name?.trim() || !message?.trim()) {
      return res.status(400).json({
        message: "نام و پیام الزامی است",
      });
    }

    const newMessage = await ChatMessage.create({
      name: name.trim(),
      message: message.trim(),
    });

    res.status(201).json(newMessage);
  } catch (err) {
    console.error("POST chat error:", err);

    res.status(500).json({
      message: "خطا در ارسال پیام",
    });
  }
});

module.exports = router;