require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const run = async () => {
  await connectDB();

  const db = mongoose.connection.db;

  // انتقال از "equipment" (مفرد) به "equipments" (جمع)
  const oldCollection = db.collection("equipment");
  const newCollection = db.collection("equipments");

  const oldDocs = await oldCollection.find({}).toArray();
  console.log(`تعداد سندهای پیدا شده در کالکشن قدیمی: ${oldDocs.length}`);

  if (oldDocs.length === 0) {
    console.log("چیزی برای انتقال پیدا نشد.");
    process.exit(0);
  }

  for (const doc of oldDocs) {
    const exists = await newCollection.findOne({ _id: doc._id });
    if (!exists) {
      await newCollection.insertOne(doc);
      console.log(`✅ منتقل شد: ${doc.title || doc._id}`);
    } else {
      console.log(`⏭️ از قبل موجود بود: ${doc.title || doc._id}`);
    }
  }

  console.log("🎉 انتقال کامل شد!");
  process.exit(0);
};

run();