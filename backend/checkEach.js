require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Category = require("./models/Category");
const Equipment = require("./models/Equipment");

const run = async () => {
  await connectDB();

  const db = mongoose.connection.db;
  const raw = await db
    .collection("equipments")
    .find({ isActive: true, isApproved: true })
    .toArray();

  console.log(`تعداد خام: ${raw.length}\n`);

  for (const doc of raw) {
    try {
      const viaMongoose = await Equipment.findById(doc._id);
      console.log(`✅ ${doc.title} | category خام: ${doc.category} | از طریق Mongoose: ${viaMongoose ? "پیدا شد" : "پیدا نشد!"}`);
    } catch (err) {
      console.log(`❌ ${doc.title} | خطا: ${err.message}`);
    }
  }

  process.exit(0);
};

run();