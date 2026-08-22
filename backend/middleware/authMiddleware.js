const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "توکن ارسال نشده است. لطفاً وارد شوید" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "کاربر یافت نشد" });
    }

    req.user = user;
    req.impersonatedBy = decoded.impersonatedBy || null;

    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "نشست شما منقضی شده است. دوباره وارد شوید" });
    }
    return res.status(401).json({ message: "توکن نامعتبر است" });
  }
};

exports.adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "شما دسترسی ادمین ندارید" });
  }
  next();
};