require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // اگه bcrypt داری به‌جای bcryptjs، همونو استفاده کن
const User = require("./models/User");
const connectDB = require("./config/db");

const run = async () => {
  await connectDB();

  const existing = await User.findOne({ email: "admin@minepro.com" });
  if (existing) {
    console.log("یوزر ادمین از قبل وجود داره:", existing.email);
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("Admin@12345", 10);

  const admin = await User.create({
    name: "مدیر سایت",
    email: "admin@minepro.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ یوزر ادمین ساخته شد:", admin.email);
  process.exit(0);
};

run();