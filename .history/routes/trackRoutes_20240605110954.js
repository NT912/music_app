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

// Khởi tạo multer với cấu hình lưu trữ và bộ lọc
const upload = multer({
  storage: storage,
}).single("track-file");

router.post("/save-track", trackController.saveTrack);

router.post("/add-song", upload, trackController.addTrack);

module.exports = router;
