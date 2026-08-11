require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Category = require("./models/Category");
const Equipment = require("./models/Equipment");

const run = async () => {
  await connectDB();

  console.log("=================================");
  console.log("نام دیتابیس متصل شده:", mongoose.connection.name);
  console.log("هاست:", mongoose.connection.host);
  console.log("=================================");

  const all = await Equipment.find({ isActive: true, isApproved: true }).populate("category", "name slug");
  console.log(`تعداد نتیجه با فیلتر کامل و populate: ${all.length}`);
  all.forEach((doc) => console.log(`- ${doc.title}`));

  process.exit(0);
};

run();