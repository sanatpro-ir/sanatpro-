require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const run = async () => {
  await connectDB();

  const db = mongoose.connection.db;
  const collection = db.collection("equipments");

  // محصولاتی که supplier ندارن (یعنی مال ادمین‌ان) → تایید خودکار
  const result1 = await collection.updateMany(
    { supplier: { $exists: false }, isApproved: { $exists: false } },
    { $set: { isApproved: true, isActive: true } }
  );
  console.log(`✅ ${result1.modifiedCount} محصول ادمین تایید خودکار شد`);

  // محصولاتی که supplier دارن ولی isApproved ندارن → نیاز به تایید
  const result2 = await collection.updateMany(
    { supplier: { $exists: true }, isApproved: { $exists: false } },
    { $set: { isApproved: false, isActive: true } }
  );
  console.log(`⏳ ${result2.modifiedCount} محصول تامین‌کننده در انتظار تایید قرار گرفت`);

  const all = await collection.find({}).toArray();
  console.log(`\nتعداد کل محصولات: ${all.length}`);
  all.forEach((doc) =>
    console.log(`- ${doc.title} | isApproved: ${doc.isApproved} | supplier: ${doc.supplier ? "دارد" : "ندارد"}`)
  );

  process.exit(0);
};

run();
