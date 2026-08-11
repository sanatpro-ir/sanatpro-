const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB متصل شد");
  } catch (err) {
    console.error("❌ خطا در اتصال به MongoDB:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;