const express = require("express");
const router = express.Router();
const trackController = require("../controllers/trackController");
const multer = require("multer");
const path = require("path");

// Thiết lập multer để tải lên file âm nhạc vào thư mục 'uploads'
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Tạo bộ lọc file để chỉ chấp nhận các loại file âm nhạc
const fileFilter = (req, file, cb) => {
  const filetypes = /mp3|mpeg|wav/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Chỉ chấp nhận các file âm nhạc!");
  }
};

// Khởi tạo multer với cấu hình lưu trữ và bộ lọc
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 10000000 }, // Giới hạn dung lượng file (ví dụ: 10MB)
}).single("track-file");

router.post("/save-track", trackController.saveTrack);

router.post(
  "/add-song",
  upload.single("track-file"), // Sử dụng middleware upload.single() để xử lý tải lên file
  (req, res, next) => {
    // Tiếp tục sang controller để xử lý thông tin bài hát
    next();
  },
  trackController.addTrack
);

module.exports = router;
