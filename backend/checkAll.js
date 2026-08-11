require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const run = async () => {
  await connectDB();

  const db = mongoose.connection.db;
  const collection = db.collection("equipments");

  const all = await collection.find({}).toArray();
  console.log(`تعداد کل: ${all.length}\n`);
  all.forEach((doc) => {
    console.log(`عنوان: ${doc.title}`);
    console.log(`  isActive: ${doc.isActive}`);
    console.log(`  isApproved: ${doc.isApproved}`);
    console.log(`  category: ${doc.category}`);
    console.log(`  ---`);
  });

  const filtered = await collection
    .find({ isActive: true, isApproved: true })
    .toArray();
  console.log(`\nتعداد بعد از فیلتر (isActive:true, isApproved:true): ${filtered.length}`);

  process.exit(0);
};

run();