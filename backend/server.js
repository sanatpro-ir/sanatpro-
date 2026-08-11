require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const app = express();

// =========================
// Database
// =========================
connectDB();

// =========================
// Logger
// =========================
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// =========================
// CORS
// =========================
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// =========================
// Body Parser
// =========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// Static Uploads
// =========================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =========================
// API Routes
// =========================

app.use(
  "/api/payment",
  require("./routes/paymentRoutes")
);

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/inquiries",
  require("./routes/inquiryRoutes")
);

app.use(
  "/api/suppliers",
  require("./routes/supplierRoutes")
);

app.use(
  "/api/equipments",
  require("./routes/equipmentRoutes")
);

app.use(
  "/api/admin",
  require("./routes/adminRoutes")
);

app.use(
  "/api/categories",
  require("./routes/categoryRoutes")
);

app.use(
  "/api/pages",
  require("./routes/pageRoutes")
);

app.use(
  "/api/home-sections",
  require("./routes/homeSectionRoutes")
);

app.use(
  "/api/used-equipments",
  require("./routes/usedEquipmentRoutes")
);

app.use(
  "/api/my-products",
  require("./routes/supplierProductRoutes")
);

// =========================
// Health Check
// =========================
app.get("/", (req, res) => {
  res.status(200).send("MinePro Backend is running");
});

// =========================
// 404 API Handler
// =========================
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    path: req.originalUrl,
  });
});

// =========================
// Error Handler
// =========================
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// =========================
// Render PORT
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MinePro Backend running on port ${PORT}`);
});