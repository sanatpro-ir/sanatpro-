const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedImages = /jpeg|jpg|png|webp/;
  const allowedVideos = /mp4|mov|webm/;
  const ext = path.extname(file.originalname).toLowerCase().replace(".", "");

  if (allowedImages.test(ext) || allowedVideos.test(ext)) {
    return cb(null, true);
  }
  cb(new Error("فرمت فایل مجاز نیست (فقط jpg, png, webp, mp4, mov, webm)"));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 20 * 1024 * 1024 } }); // ۲۰ مگابایت (برای ویدیو)

module.exports = upload;