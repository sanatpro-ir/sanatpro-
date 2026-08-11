require("dotenv").config();
const connectDB = require("./config/db");
const Equipment = require("./models/Equipment");

const run = async () => {
  await connectDB();

  const all = await Equipment.find({ isActive: true, isApproved: true });
  console.log(`بدون populate: ${all.length} نتیجه`);
  all.forEach((doc) => console.log(`- ${doc.title}`));

  const withPopulate = await Equipment.find({ isActive: true, isApproved: true }).populate(
    "category",
    "name slug"
  );
  console.log(`\nبا populate: ${withPopulate.length} نتیجه`);
  withPopulate.forEach((doc) => console.log(`- ${doc.title} | category: ${JSON.stringify(doc.category)}`));

  process.exit(0);
};

run();