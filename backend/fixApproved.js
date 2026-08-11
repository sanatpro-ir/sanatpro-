require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const run = async () => {
  await connectDB();

  const db = mongoose.connection.db;
  const collection = db.collection("equipments");

  // برای محصولاتی که supplier ندارن (یعنی مال ادمین‌ان)، isApproved رو true کن
  const result1 = await collection.updateMany(
    { supplier: { $exists: false }, isApproved: { $exists: false } },
    { $set: { isApproved: true } }
  );
  console.log(`✅ ${result1.modifiedCount} محصول ادمین تایید خودکار شد`);

  // برای محصولاتی که supplier دارن ولی isApproved ندارن، false بذار (نیاز به تایید)
  const result2 = await collection.updateMany(
    { supplier: { $exists: true }, isApproved: { $exists: false } },
    { $set: { isApproved: false } }
  );
  console.log(`⏳ ${result2.modifiedCount} محصول تامین‌کننده در انتظار تایید قرار گرفت`);

  process.exit(0);
};

run();