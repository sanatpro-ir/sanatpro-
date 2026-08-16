require("dotenv").config();

const path = require("path");
const http = require("http");
const express = require("express");
const cors = require("cors");
const { Server } = require("socket.io");
const connectDB = require("./config/db");
const ChatMessage = require("./models/ChatMessage");

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
app.use("/api/chat", require("./routes/chatRoutes"));


// Test route (فقط برای تست، اگه فرانت جدا سرو میشه)
app.get("/api", (req, res) => {
  res.send("MinePro Backend is running");
});

// ================= SOCKET.IO SETUP =================
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const RATE_LIMIT_MS = 2000; // حداقل فاصله بین دو پیام از یک سوکت
const lastMessageTime = new Map();

io.on("connection", (socket) => {
  console.log("Chat user connected:", socket.id);

  // ارسال تاریخچه‌ی آخرین پیام‌ها به کاربر تازه‌وصل‌شده
  ChatMessage.find()
    .sort({ createdAt: -1 })
    .limit(50)
    .then((docs) => {
      const history = docs.reverse().map((d) => ({
        _id: d._id,
        name: d.name,
        text: d.text,
        createdAt: d.createdAt,
      }));
      socket.emit("chat:history", history);
    })
    .catch((err) => console.error("Chat history error:", err));

  socket.on("chat:message", async (payload) => {
    try {
      const now = Date.now();
      const last = lastMessageTime.get(socket.id) || 0;
      if (now - last < RATE_LIMIT_MS) return; // rate limit ساده
      lastMessageTime.set(socket.id, now);

      const name = (payload?.name || "").toString().trim().slice(0, 40) || "کاربر مهمان";
      const text = (payload?.text || "").toString().trim().slice(0, 500);

      if (!text) return;

      const saved = await ChatMessage.create({ name, text });

      const outgoing = {
        _id: saved._id,
        name: saved.name,
        text: saved.text,
        createdAt: saved.createdAt,
      };

      io.emit("chat:message", outgoing);
    } catch (err) {
      console.error("Chat message error:", err);
    }
  });

  socket.on("disconnect", () => {
    lastMessageTime.delete(socket.id);
    console.log("Chat user disconnected:", socket.id);
  });
});

// Render PORT
const PORT = process.env.PORT || 5000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});