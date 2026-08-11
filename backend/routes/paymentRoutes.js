const express = require("express");
const router = express.Router();
const axios = require("axios");
const Payment = require("../models/Payment");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");

const MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID;

// ===== فقط برای تست =====
console.log("==================================");
console.log("Merchant ID:", MERCHANT_ID);
console.log("Length:", MERCHANT_ID?.length);
console.log("==================================");

const AMOUNT_RIAL = 10000000;
const CALLBACK_URL = "http://localhost:3000/payment/callback";

const ZARINPAL_REQUEST_URL =
  "https://api.zarinpal.com/pg/v4/payment/request.json";

const ZARINPAL_VERIFY_URL =
  "https://api.zarinpal.com/pg/v4/payment/verify.json";

const ZARINPAL_STARTPAY_URL =
  "https://www.zarinpal.com/pg/StartPay/";

// ======================================
// شروع پرداخت
// ======================================
router.post("/request", protect, async (req, res) => {
  try {
    console.log("Payment Request Started");

    const response = await axios.post(ZARINPAL_REQUEST_URL, {
      merchant_id: MERCHANT_ID,
      amount: AMOUNT_RIAL,
      callback_url: CALLBACK_URL,
      description: "اشتراک ماهانه پنل تامین‌کننده SANAT PRO",
      metadata: {
        email: req.user.email,
      },
    });

    console.log("Zarinpal Response:");
    console.log(response.data);

    const data = response.data.data;

    if (!data || !data.authority) {
      return res.status(400).json({
        message: "خطا در ایجاد پرداخت",
      });
    }

    await Payment.create({
      user: req.user._id,
      amount: AMOUNT_RIAL,
      authority: data.authority,
      status: "pending",
    });

    return res.json({
      url: ZARINPAL_STARTPAY_URL + data.authority,
    });

  } catch (err) {

    console.log("========== ERROR ==========");
    console.log(err.response?.data);
    console.log(err.message);
    console.log("===========================");

    return res.status(500).json({
      message: "خطا در اتصال به درگاه پرداخت",
    });
  }
});

// ======================================
// تایید پرداخت
// ======================================
router.post("/verify", protect, async (req, res) => {
  try {

    const { authority } = req.body;

    const payment = await Payment.findOne({
      authority,
      user: req.user._id,
    });

    if (!payment) {
      return res.status(404).json({
        message: "پرداخت پیدا نشد",
      });
    }

    const response = await axios.post(ZARINPAL_VERIFY_URL, {
      merchant_id: MERCHANT_ID,
      amount: payment.amount,
      authority,
    });

    const data = response.data.data;

    if (data.code === 100 || data.code === 101) {

      payment.status = "success";
      payment.refId = data.ref_id.toString();

      await payment.save();

      const expireDate = new Date();
      expireDate.setMonth(expireDate.getMonth() + 1);

      await User.findByIdAndUpdate(req.user._id, {
        subscriptionActive: true,
        subscriptionExpiresAt: expireDate,
      });

      return res.json({
        success: true,
        refId: data.ref_id,
      });

    } else {

      payment.status = "failed";
      await payment.save();

      return res.status(400).json({
        success: false,
        message: "پرداخت تایید نشد",
      });
    }

  } catch (err) {

    console.log("========== VERIFY ERROR ==========");
    console.log(err.response?.data);
    console.log(err.message);
    console.log("==================================");

    return res.status(500).json({
      message: "خطا در تایید پرداخت",
    });
  }
});

// ======================================
// وضعیت اشتراک
// ======================================
router.get("/subscription-status", protect, async (req, res) => {

  const user = await User.findById(req.user._id);

  const isActive =
    user.subscriptionActive &&
    user.subscriptionExpiresAt &&
    new Date(user.subscriptionExpiresAt) > new Date();

  return res.json({
    active: isActive,
    expiresAt: user.subscriptionExpiresAt,
  });

});

module.exports = router;