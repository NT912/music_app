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

const upload = multer({ storage: storage });

// Route xử lý khi người dùng gửi GET request lấy danh sách bài hát
router.get("/fetch-tracks", trackController.fetchTracks);

// Route xử lý khi người dùng gửi POST request để lưu bài hát mới
router.post(
  "/save-track",
  upload.single("track-file"),
  trackController.saveTrack
);

module.exports = router;
