const express = require("express");
const router = express.Router();
const Inquiry = require("../models/Inquiry");

// ثبت استعلام
router.post("/", async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.json(inquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// دیدن همه استعلام‌ها (Admin)
router.get("/", async (req, res) => {
  const inquiries = await Inquiry.find();
  res.json(inquiries);
});

module.exports = router;
