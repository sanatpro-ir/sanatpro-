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
    console.error("Chat GET error:", err);

    res.status(500).json({
      message: "خطا در دریافت پیام‌ها",
    });
  }
});

// ارسال پیام
router.post("/", async (req, res) => {
  try {
    const name = String(req.body.name || "").trim();
    const message = String(req.body.message || "").trim();

    if (!name || !message) {
      return res.status(400).json({
        message: "نام و پیام الزامی است.",
      });
    }

    if (name.length > 80) {
      return res.status(400).json({
        message: "نام بیش از حد طولانی است.",
      });
    }

    if (message.length > 500) {
      return res.status(400).json({
        message: "پیام بیش از حد طولانی است.",
      });
    }

    const created = await ChatMessage.create({
      name,
      message,
    });

    res.status(201).json(created);
  } catch (err) {
    console.error("Chat POST error:", err);

    res.status(500).json({
      message: "خطا در ارسال پیام",
    });
  }
});

module.exports = router;