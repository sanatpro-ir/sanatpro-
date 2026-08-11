require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

connectDB();

const app = express();

// Logger
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// CORS
app.use(cors());

// Body parser
app.use(express.json());

// Uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/inquiries", require("./routes/inquiryRoutes"));
app.use("/api/suppliers", require("./routes/supplierRoutes"));
app.use("/api/equipments", require("./routes/equipmentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/categories", require("./routes/categoryRoutes"));
app.use("/api/pages", require("./routes/pageRoutes"));
app.use("/api/home-sections", require("./routes/homeSectionRoutes"));
app.use("/api/used-equipments", require("./routes/usedEquipmentRoutes"));
app.use("/api/my-products", require("./routes/supplierProductRoutes"));

// Test route
app.get("/", (req, res) => {
  res.send("MinePro Backend is running");
});

// Render PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});