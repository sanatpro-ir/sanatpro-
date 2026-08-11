require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const run = async () => {
  await connectDB();

  const db = mongoose.connection.db;
  const oldCollection = db.collection("equipment");
  const newCollection = db.collection("equipments");

  const oldDocs = await oldCollection.find({}).toArray();
  console.log(`تعداد سندهای پیدا شده در کالکشن قدیمی "equipment": ${oldDocs.length}`);

  let migrated = 0;
  let skipped = 0;

  for (const doc of oldDocs) {
    const exists = await newCollection.findOne({ _id: doc._id });
    if (!exists) {
      // مطمئن شو isApproved و isActive داره
      if (doc.isApproved === undefined) doc.isApproved = true;
      if (doc.isActive === undefined) doc.isActive = true;

      await newCollection.insertOne(doc);
      migrated++;
      console.log(`✅ منتقل شد: ${doc.title || doc._id}`);
    } else {
      skipped++;
      console.log(`⏭️ از قبل موجود بود: ${doc.title || doc._id}`);
    }
  }

  console.log(`\n🎉 انتقال کامل شد! ${migrated} منتقل شد، ${skipped} از قبل موجود بود.`);
  process.exit(0);
};

run();