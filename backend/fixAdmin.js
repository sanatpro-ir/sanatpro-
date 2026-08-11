require("dotenv").config();
const User = require("./models/User");
const connectDB = require("./config/db");

const run = async () => {
  await connectDB();

  const user = await User.findOneAndUpdate(
    { email: "admin@minepro.com" },
    { role: "admin" },
    { new: true }
  );

  if (!user) {
    console.log("❌ کاربری با این ایمیل پیدا نشد");
  } else {
    console.log("✅ نقش کاربر به admin برگشت:", user.email, user.role);
  }

  process.exit(0);
};

run();