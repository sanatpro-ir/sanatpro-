const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "لطفاً همه فیلدهای ضروری (نام، ایمیل، شماره تماس، رمز عبور) را پر کنید",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "رمز عبور باید حداقل ۶ کاراکتر باشد" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "این ایمیل قبلاً ثبت‌نام کرده است" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      phone,
      password: hashed,
      role: role === "admin" ? "supplier" : role, // جلوگیری از ساخت ادمین از طریق فرم عمومی
    });

    const userSafe = user.toObject();
    delete userSafe.password;

    res.status(201).json(userSafe);
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ message: "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "ایمیل و رمز عبور را وارد کنید" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "ایمیل یا رمز عبور اشتباه است" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "ایمیل یا رمز عبور اشتباه است" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const userSafe = user.toObject();
    delete userSafe.password;

    res.json({ token, user: userSafe });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "خطا در ورود. لطفاً دوباره تلاش کنید" });
  }
};