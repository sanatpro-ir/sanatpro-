require("dotenv").config();
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const connectDB = require("./config/db");

const run = async () => {
  await connectDB();

  const email = "test@supplier.com";
  const existing = await User.findOne({ email });

  const oneYearLater = new Date();
  oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);

  if (existing) {
    existing.subscriptionActive = true;
    existing.subscriptionExpiresAt = oneYearLater;
    await existing.save();
    console.log("✅ حساب تستی از قبل بود، اشتراکش فعال شد تا:", oneYearLater);
  } else {
    const hashedPassword = await bcrypt.hash("Test1234", 10);
    await User.create({
      name: "تامین‌کننده تستی",
      email,
      password: hashedPassword,
      role: "supplier",
      subscriptionActive: true,
      subscriptionExpiresAt: oneYearLater,
    });
    console.log("✅ حساب تستی ساخته شد");
  }

  console.log("ایمیل: test@supplier.com");
  console.log("پسورد: Test1234");
  process.exit(0);
};

run();