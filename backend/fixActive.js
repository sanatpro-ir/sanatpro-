require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const run = async () => {
  await connectDB();

  const db = mongoose.connection.db;
  const collection = db.collection("equipments");

  const result = await collection.updateMany(
    { isActive: { $ne: true } },
    { $set: { isActive: true } }
  );

  console.log(`✅ ${result.modifiedCount} سند بروزرسانی شد (isActive: true)`);

  const all = await collection.find({}).toArray();
  console.log(`تعداد کل اسناد در equipments: ${all.length}`);
  all.forEach((doc) => console.log(`- ${doc.title} | isActive: ${doc.isActive}`));

  process.exit(0);
};

run();